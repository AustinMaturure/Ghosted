from django.db import models
from django.utils.text import slugify

class Category(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(default=None)
    def __str__(self):
        return self.name
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Colour(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(default=None)
    def __str__(self):
        return self.name
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

class Size(models.Model):
    size = models.CharField(max_length=30)
    slug = models.SlugField(default=None)

    def __str__(self):
        return self.size
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.size)
        super().save(*args, **kwargs)


class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    materials = models.CharField(max_length=1000,blank=True, null=True)
    discount = models.BooleanField(default=False)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True)
    colour = models.ManyToManyField(Colour)
    size = models.ManyToManyField(Size)
    price = models.FloatField(default=100.00)
    slug = models.SlugField(default=None, blank=True, null=True)

    def __str__(self):
        return self.name
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

class ProductImages(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='img', default='', null=True, blank=True)
