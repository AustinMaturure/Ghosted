from django.db import models
# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    discount = models.BooleanField(default=False)
    price = models.FloatField(default=100.00)
    slug = models.SlugField(default=None, blank=True, null=True)

    def __str__(self):
        return self.name


class ProductImages(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='img', default='', null=True, blank=True)
