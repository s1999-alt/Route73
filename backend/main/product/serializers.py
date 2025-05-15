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
    first_item = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'product_name', 'product_description', 'first_item']

    def get_first_item(self, obj):
        if hasattr(obj, 'first_item') and obj.first_item:
            return ProductItemSerializer(obj.first_item[0], context=self.context).data
        return None
 


#serializer for product details(additional details of the product)
class ProductDetailContentSerializer(serializers.ModelSerializer):
  class Meta:
    model = ProductDetails
    fields = ['product_details', 'size_and_fit', 'material_and_care', 'specifications']


#serializer for showing the color options and image of a related products in detail page
class ProductItemColorOptionSerializer(serializers.ModelSerializer):
  color = serializers.CharField(source='color.color_name')
  main_image = serializers.SerializerMethodField()

  class Meta:
    model = ProductItem
    fields = ['id', 'color', 'main_image']
  
  def get_main_image(self, obj):
    main_image = obj.images.filter(is_main=True).first()
    request = self.context.get('request')
    if main_image and request:
      return request.build_absolute_uri(main_image.image.url)
    return None

#serializer for product details, which showing in the detail page of product.
class ProductDetailSerializer(serializers.ModelSerializer):
  product_category = ProductCategorySerializer()
  details = ProductItemSerializer(source='items', many=True)
  additional_info = ProductDetailContentSerializer(source='detail', read_only=True)
  color_options = serializers.SerializerMethodField()

  class Meta:
    model = Product
    fields = ['id', 'product_name', 'product_description', 'product_category', 'details', 'additional_info', 'color_options']
  
  def get_color_options(self, obj):
    items = obj.items.all()
    serializer = ProductItemColorOptionSerializer(items, many=True, context=self.context)
    return serializer.data




