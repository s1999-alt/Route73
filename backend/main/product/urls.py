from django.urls import path
from .views import ProductCategoryListAPIView, ProductListAPIView

urlpatterns = [
    path('categories/', ProductCategoryListAPIView.as_view(), name='product-category-list'),
    path('products/',ProductListAPIView.as_view(), name='product-list')
]