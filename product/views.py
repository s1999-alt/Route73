from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Prefetch
from rest_framework.pagination import LimitOffsetPagination
from .models import ProductCategory, Product, ProductItem, ProductVariation
from .serializers import ProductCategorySerializer, ProductWithFirstItemSerializer,ProductItemDetailSerializer



# API View for listing all product categories
class ProductCategoryListAPIView(APIView):
  def get(self, request):
    categories = ProductCategory.objects.all()
    serializer = ProductCategorySerializer(categories, many = True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# API View for listing all products first item in the shop page
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
    print("-------------------------------", products)

    flattened_items = [
      product.first_item[0] for product in products if hasattr(product, 'first_item') and product.first_item
    ]

    paginator = LimitOffsetPagination()
    paginated_products = paginator.paginate_queryset(flattened_items, request, view=self)
    serializer = ProductWithFirstItemSerializer(paginated_products, many=True, context={'request': request})
    return paginator.get_paginated_response(serializer.data)
  
#API view for getting product details with id in the product detail page
class ProductItemDetailAPIView(APIView):
  def get(self, request, item_id):
    try:
      product_item = ProductItem.objects.select_related(
        'product__product_category', 'color'
      ).prefetch_related(
        'images',
        Prefetch('variations', queryset=ProductVariation.objects.select_related('size')),
        Prefetch('product__items', queryset=ProductItem.objects.select_related('color').prefetch_related('images'))
      ).get(id=item_id)

      serializer = ProductItemDetailSerializer(product_item, context={'request': request})
      return Response(serializer.data, status=status.HTTP_200_OK)
    
    except ProductItem.DoesNotExist:
      return Response({'detail': 'Product item not found.'}, status=status.HTTP_404_NOT_FOUND)








