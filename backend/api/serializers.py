from rest_framework import serializers
from .models import UMKM, UMKMImage


class UMKMSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()

    class Meta:
        model = UMKM
        fields = '__all__'

    def get_images(self, obj):
        request = self.context.get('request')
        images = obj.images_set.all().order_by('-uploaded_at')
        urls = []
        for im in images:
            if im.image:
                if request is not None:
                    urls.append(request.build_absolute_uri(im.image.url))
                else:
                    urls.append(im.image.url)
        return urls


class UMKMImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UMKMImage
        fields = ('id', 'image', 'uploaded_at', 'umkm')
