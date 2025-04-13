from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ProductCategory, Product
from .serializers import ProductCategorySerializer, ProductSerializer


# API View for listing all product categories
class ProductCategoryListAPIView(APIView):
  def get(self, request):
    categories = ProductCategory.objects.all()
    serializer = ProductCategorySerializer(categories, many = True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  
  
# API View for listing all products
class ProductListAPIView(APIView):
  def get(self, request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

