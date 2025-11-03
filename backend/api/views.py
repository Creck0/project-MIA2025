from rest_framework import viewsets
from .models import UMKM, UMKMImage
from .serializers import UMKMSerializer, UMKMImageSerializer


class UMKMViewSet(viewsets.ModelViewSet):
    queryset = UMKM.objects.all().order_by('-created_at')
    serializer_class = UMKMSerializer
    
    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx.update({"request": self.request})
        return ctx


from rest_framework.parsers import MultiPartParser, FormParser
from .permissions import IsAdminWithChangeUMKM


class UMKMImageViewSet(viewsets.ModelViewSet):
    queryset = UMKMImage.objects.all().order_by('-uploaded_at')
    serializer_class = UMKMImageSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = (IsAdminWithChangeUMKM,)
