from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import viewsets, status
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.pagination import PageNumberPagination
from .permissions import IsAdminOrReadOnly


from ghosted.models import Product
from .filters import ProductFilter
from .serializers import ProductSerializer

class ApiProducts(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly,]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['price']
    filterset_class = ProductFilter
    search_fields = ['name', 'description']
    ordering_fields = ['price']
    pagination_class = PageNumberPagination
