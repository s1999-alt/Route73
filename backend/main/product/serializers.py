from rest_framework import serializers
from .models import ProductCategory, Product, SizeOption, ProductImage, ProductItem, Color, ProductVariation



class ProductCategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = ProductCategory
    fields = '__all__'


class ColorSerializer(serializers.ModelSerializer):
  class Meta:
      model = Color
      fields = ['color_name']


class ProductImageSerializer(serializers.ModelSerializer):
  class Meta:
    model = ProductImage
    fields = ['image', 'is_main']


class SizeOptionSerializer(serializers.ModelSerializer):
  class Meta:
    model = SizeOption
    fields = ['size_name']


class ProductVariationSerializer(serializers.ModelSerializer):
    size = serializers.CharField(source='size.size_name')

    class Meta:
        model = ProductVariation
        fields = ['size', 'quantity_in_stock']


class ProductItemSerializer(serializers.ModelSerializer):
  color = serializers.CharField(source='color.color_name')
  images = ProductImageSerializer(many=True)
  variations = ProductVariationSerializer(many=True)

  class Meta:
    model = ProductItem
    fields = ['original_price', 'sale_price', 'color', 'images', 'variations']
    

class ProductSerializer(serializers.ModelSerializer):
  details = ProductItemSerializer(many=True, source='items')

  class Meta:
    model = Product
    fields = ['id', 'product_name', 'product_description', 'product_category', 'details']