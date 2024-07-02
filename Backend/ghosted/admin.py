from django.contrib import admin
from .models import *


# Register your models here.

class ProductAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}


admin.site.register(Product, ProductAdmin)
admin.site.register(ProductImages)
admin.site.register(Category)
admin.site.register(Colour)
admin.site.register(Size)
