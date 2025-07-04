from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import ProductVariation

@receiver(post_save, sender=ProductVariation)
def update_product_item_availability(sender, instance, **kwargs):
  product_item = instance.product_item
  has_stock = product_item.variations.filter(quantity_in_stock__gt=0).exists()
  product_item.in_stock = has_stock
  product_item.save(update_fields=["in_stock"])

