from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import viewsets, status
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.pagination import PageNumberPagination
from .permissions import IsAdminOrReadOnly
from rest_framework.response import Response
from rest_framework import generics
from django.db.models import Q
from ghosted.models import Product, Colour,Category, Size
from .filters import ProductFilter
from .serializers import ProductSerializer,ColourSerializer, CategorySerializer, SizeSerializer

class ApiProducts(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly,]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['price']
    filterset_class = ProductFilter
    search_fields = ['name', 'description']
    ordering_fields = ['price']
    lookup_field = 'slug'

class ApiColour(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly,]
    serializer_class = ColourSerializer
    queryset = Product.objects.all()
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['name']
    pagination_class = PageNumberPagination


class ApiCategory(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly,]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['name']


class ApiSize(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly,]
    serializer_class = SizeSerializer
    queryset = Size.objects.all()
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['size']

class ProductSearchView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        search_query = self.request.query_params.get('query', None)
        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) |
                Q(category__name__icontains=search_query)
            )
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = []
        for item in serializer.data:
            data.append({
                'name': item['name'],
                'category': item['category']['name'] if 'category' in item and 'name' in item['category'] else None
            })
        return Response(data)