from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('products', views.ApiProducts, basename='product')



urlpatterns = [
    path("", include(router.urls)),
    path("search/", views.ProductSearchView.as_view(), name='product-search')
]