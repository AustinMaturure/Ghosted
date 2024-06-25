from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('products', views.ApiProducts, basename='product')


urlpatterns = [
    path("", include(router.urls)),
]