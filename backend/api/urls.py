from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UMKMViewSet, UMKMImageViewSet

router = DefaultRouter()
router.register('umkms', UMKMViewSet)
router.register('umkm-images', UMKMImageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
