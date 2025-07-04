from django.db import models
from product.models import ProductItem


class Wishlist(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='wishlists')
    product_item = models.ForeignKey(ProductItem, on_delete=models.CASCADE, related_name='wishlisted_by')
    creates_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'product_item')

    def __str__(self):
        return f"{self.user} -> {self.product_item}"
    