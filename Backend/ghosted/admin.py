from django.contrib import admin
from .models import *


# Register your models here.

class ProductAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}
class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}
class ColourAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}
class SizeAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('size',)}

admin.site.register(Product, ProductAdmin)
admin.site.register(ProductImages)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Colour, ColourAdmin)
admin.site.register(Size, SizeAdmin)
