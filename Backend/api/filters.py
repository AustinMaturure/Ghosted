from django_filters.rest_framework import FilterSet
from ghosted.models import Product


class ProductFilter(FilterSet):
    class Meta:
        model = Product
        fields = {
            'price': ['gt', 'lt']
        }