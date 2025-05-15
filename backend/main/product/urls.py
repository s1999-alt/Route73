from django.urls import path
from .views import ProductCategoryListAPIView, ProductListAPIView, ProductDetailAPIView

urlpatterns = [
    path('categories/', ProductCategoryListAPIView.as_view(), name='product-category-list'),
    path('get-all-products/',ProductListAPIView.as_view(), name='product-list'),
    path('get-product/<int:id>/',ProductDetailAPIView.as_view(), name='product-detail')
]