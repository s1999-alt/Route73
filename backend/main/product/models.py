from django.db import models
import uuid


class SizeCategory(models.Model):
   category_name = models.CharField(max_length=100, unique=True)
   created_at = models.DateTimeField(auto_now_add=True)

   def __str__(self):
       return self.category_name
   

class SizeOption(models.Model):
   size_name = models.CharField(max_length=20, unique=True)
   sort_order = models.PositiveIntegerField(default=0)
   size_category = models.ForeignKey(SizeCategory, on_delete=models.CASCADE, related_name="sizes")

   class Meta:
      unique_together = ("size_category", "size_name")  # prevent duplicates for same category

   def __str__(self):
       return f"{self.size_name} ({self.size_category.category_name})"
   

class ProductCategory(models.Model):
  category_name = models.CharField(max_length=100, unique=True)
  category_description = models.TextField(blank=True, null=True)
  parent_category = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='subcategories')
  size_category = models.ForeignKey(SizeCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name="product_categories")
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
      return f"{self.category_name}"


class Product(models.Model):
  product_name = models.CharField(max_length=150, unique=True)
  product_description = models.TextField(blank=True, null=True)
  product_category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE, related_name="products")
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
      return self.product_name
  

class Color(models.Model):
   color_name = models.CharField(max_length=50, unique=True)

   def __str__(self):
      return self.color_name
   

class ProductItem(models.Model):
   product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="items")
   color = models.ForeignKey(Color, on_delete=models.SET_NULL, null=True, related_name="items")
   original_price = models.DecimalField(max_digits=10, decimal_places=2)
   sale_price = models.DecimalField(max_digits=10, decimal_places=2)
   product_code = models.CharField(max_length=20, unique=True, blank=True)
   is_available =models.BooleanField(default=True)
   created_at = models.DateTimeField(auto_now_add=True)

   def save(self, *args, **kwargs):
      if not self.product_code:
         self.product_code = self.generate_product_code()
      super().save(*args, **kwargs)

   def generate_product_code(self):
      return str(uuid.uuid4().int)[:6]
      
   def __str__(self):
      return f"{self.product.product_name} - {self.color.color_name}"
   

class ProductImage(models.Model):
   product_item = models.ForeignKey(ProductItem, on_delete=models.CASCADE, related_name='images')
   image = models.ImageField(upload_to="product_images/", null=True, blank=True)
   is_main = models.BooleanField(default=False)
   created_at = models.DateTimeField(auto_now_add=True)

   def __str__(self):
       return f"Image for {self.product_item} - {'Main' if self.is_main else 'Secondary'}"
   
   
class ProductVariation(models.Model):
   product_item = models.ForeignKey(ProductItem, on_delete=models.CASCADE, related_name="variations")
   size = models.ForeignKey(SizeOption, on_delete=models.CASCADE, related_name='variations')
   quantity_in_stock = models.PositiveIntegerField(default=0)

   class Meta:
      unique_together = ('product_item', 'size')
   
   def __str__(self):
        return f"{self.product_item} - {self.size.size_name}"


class ProductDetails(models.Model):
   product = models.OneToOneField(Product, on_delete=models.CASCADE, related_name='detail')
   product_details = models.TextField(blank=True, null=True)
   size_and_fit = models.TextField(blank=True, null=True)
   material_and_care = models.TextField(blank=True, null=True)
   specifications = models.JSONField(blank=True, null=True)

   def __str__(self):
       return f"Details for {self.product.product_name}"
   

   
   



   
   
   


   
  





  
  




