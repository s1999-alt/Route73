from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ProductCategory, Product, ProductItem, ProductVariation
from .serializers import ProductCategorySerializer, ProductWithFirstItemSerializer,ProductDetailSerializer
from django.db.models import Prefetch


# API View for listing all product categories
class ProductCategoryListAPIView(APIView):
  def get(self, request):
    categories = ProductCategory.objects.all()
    serializer = ProductCategorySerializer(categories, many = True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# API View for listing all products in the homepage
class ProductListAPIView(APIView):
  def get(self, request):
    products = Product.objects.prefetch_related(
      Prefetch(
        'items',
        queryset=ProductItem.objects.select_related('color')
          .prefetch_related('images', Prefetch('variations', queryset=ProductVariation.objects.select_related('size')))
          .order_by('id')[:1],
        to_attr='first_item'
      )
    ).all()
    serializer = ProductWithFirstItemSerializer(products, many=True, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)
  
#API view for getting product details with id in the product detail page
class ProductDetailAPIView(APIView):
  def get(self, request, id):
    try:
      product = Product.objects.prefetch_related(
        'items__color', 'items__images', 'items__variations__size',
        'product_category__parent_category'
      ).select_related('product_category', 'detail').get(id=id)

      serializer = ProductDetailSerializer(product, context={'request': request})
      return Response(serializer.data, status=status.HTTP_200_OK)
    
    except Product.DoesNotExist:
      return Response({'detail': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)






