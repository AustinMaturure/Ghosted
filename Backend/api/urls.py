from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('products', views.ApiProducts, basename='product')
router.register('colour', views.ApiProducts, basename='colour')
router.register('category', views.ApiProducts, basename='category')
router.register('size', views.ApiSize, basename='size')


urlpatterns = [
    path("", include(router.urls)),
]