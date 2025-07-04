from rest_framework import serializers
from .models import ProductCategory, Product, SizeOption, ProductImage, ProductItem, Color, ProductVariation, ProductDetails


#serializer for product category
class ProductCategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = ProductCategory
    fields = ['id', 'category_name', 'parent_category']

#serializer for color
class ColorSerializer(serializers.ModelSerializer):
  class Meta:
      model = Color
      fields = ['color_name']

#serializer for product-image
class ProductImageSerializer(serializers.ModelSerializer):
  image = serializers.SerializerMethodField()

  class Meta:
    model = ProductImage
    fields = ['image', 'is_main']
  
  def get_image(self, obj):
    request = self.context.get('request')
    if request and obj.image:
      return request.build_absolute_uri(obj.image.url)
    return None

#serializer for size
class SizeOptionSerializer(serializers.ModelSerializer):
  class Meta:
    model = SizeOption
    fields = ['size_name']

#serializer for product variation
class ProductVariationSerializer(serializers.ModelSerializer):
    size = SizeOptionSerializer()

    class Meta:
        model = ProductVariation
        fields = ['id', 'size', 'quantity_in_stock']

#serializer for product Item
class ProductItemSerializer(serializers.ModelSerializer):
  color = serializers.CharField(source='color.color_name')
  images = ProductImageSerializer(many=True, read_only=True)
  variations = serializers.SerializerMethodField()

  class Meta:
    model = ProductItem
    fields = ['id', 'original_price', 'sale_price', 'color','images', 'variations']
  
  def get_variations(self, obj):
    return [
        {'size': variation.size.size_name}
        for variation in obj.variations.all()
    ]

#serializer for getting the first item from product item to show in the home page
class ProductWithFirstItemSerializer(serializers.ModelSerializer):
  product_name = serializers.CharField(source='product.product_name')
  product_description = serializers.CharField(source='product.product_description', allow_null=True)
  color = serializers.CharField(source='color.color_name')
  images = ProductImageSerializer(many=True, read_only=True)
  variations = serializers.SerializerMethodField()

  class Meta:
    model = ProductItem
    fields = ['id', 'product_name', 'product_description', 'original_price', 'sale_price', 'color', 'images', 'variations', 'in_stock']

  def get_variations(self, obj):
      return [variation.size.size_name for variation in obj.variations.all()]
 
#serializer for product details(additional details of the product)
class ProductDetailContentSerializer(serializers.ModelSerializer):
  class Meta:
    model = ProductDetails
    fields = ['product', 'size_and_fit', 'material_and_care', 'specifications']

#serializer for showing the color options and image of a related products in detail page
class ProductItemColorOptionSerializer(serializers.ModelSerializer):
  color = serializers.CharField(source='color.color_name')
  main_image = serializers.SerializerMethodField()
  id = serializers.IntegerField()

  class Meta:
    model = ProductItem
    fields = ['id', 'color', 'main_image']
  
  def get_main_image(self, obj):
    main_image = obj.images.filter(is_main=True).first()
    request = self.context.get('request')
    if main_image and request:
      return request.build_absolute_uri(main_image.image.url)
    return None

#serializer for productitem details, which showing in the detail page of product.
class ProductItemDetailSerializer(serializers.ModelSerializer):
  product_id = serializers.IntegerField(source='product.id')
  product_name = serializers.CharField(source='product.product_name')
  product_description = serializers.CharField(source='product.product_description')
  product_category = serializers.CharField(source='product.product_category.category_name')
  color = serializers.CharField(source='color.color_name')
  images = ProductImageSerializer(many=True, read_only=True)
  variations = ProductVariationSerializer(many=True, read_only=True)
  product_detail = serializers.SerializerMethodField()
  related_items = serializers.SerializerMethodField()

  class Meta:
    model = ProductItem
    fields = [
      'id', 'product_id', 'product_name', 'product_description', 'product_category', 'original_price', 
      'sale_price', 'color', 'images', 'variations', 'product_detail', 'related_items'
    ]

  def get_product_detail(self, obj): #extra details of product items
    try:
      detail = obj.product.detail
      return ProductDetailContentSerializer(detail).data
    except ProductDetails.DoesNotExist:
      return None
  
  def get_related_items(self, obj):
    related_items = obj.product.items.exclude(id=obj.id)
    return ProductItemColorOptionSerializer(related_items, many=True, context=self.context).data



