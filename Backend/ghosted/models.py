from django.db import models
from django.utils.text import slugify
import random
import time

class Category(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name
    

class Colour(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name


class Size(models.Model):
    size = models.CharField(max_length=30)
    def __str__(self):
        return self.size


class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    materials = models.CharField(max_length=1000,blank=True, null=True)
    discount = models.FloatField(default=0.0)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True)
    colour = models.ManyToManyField(Colour)
    size = models.ManyToManyField(Size)
    price = models.FloatField(default=100.00)
    slug = models.SlugField(default=None, blank=True, null=True)

    def __str__(self):
        return self.name
    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            unique_part = str(int(time.time())) + str(random.randint(1, 1000)) 
            return f"{base_slug}-{unique_part}"
        super().save(*args, **kwargs)

class ProductImages(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='img', default='', null=True, blank=True)
    def __str__(self):
        return f"Image for {self.product.name}"
