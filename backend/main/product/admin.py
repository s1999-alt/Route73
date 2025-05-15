from django.contrib import admin
from .models import SizeCategory, SizeOption, ProductCategory, Product, Color, ProductItem, ProductVariation,ProductImage, ProductDetails

admin.site.register(SizeCategory)
admin.site.register(ProductCategory)
admin.site.register(Product)
admin.site.register(Color)
admin.site.register(SizeOption)
admin.site.register(ProductItem)
admin.site.register(ProductVariation)
admin.site.register(ProductImage)
admin.site.register(ProductDetails)


