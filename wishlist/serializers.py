from rest_framework import serializers
from .models import Wishlist
from product.serializers import ProductItemSerializer
from product.models import ProductItem


class WishlistSerializer(serializers.ModelSerializer):
  product_item = ProductItemSerializer(read_only=True)
  product_item_id = serializers.PrimaryKeyRelatedField(
    queryset=ProductItem.objects.all(), source='product_item', write_only=True
  )

  class Meta:
    model = Wishlist
    fields = ['id', 'product_item', 'product_item_id', 'creates_at']