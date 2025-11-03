from django.db import models


class UMKM(models.Model):
    name = models.CharField(max_length=200)
    FOOD = 'food'
    DRINK = 'drink'
    SERVICE = 'service'
    CATEGORY_CHOICES = [
        (FOOD, 'Makanan'),
        (DRINK, 'Minuman'),
        (SERVICE, 'Jasa'),
    ]

    category = models.CharField(max_length=32, choices=CATEGORY_CHOICES, default=FOOD)

    description = models.TextField(blank=True)
    address = models.CharField(max_length=500, blank=True)
    phone = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True, null=True)
    images = models.JSONField(default=list, blank=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class UMKMImage(models.Model):
    umkm = models.ForeignKey(UMKM, related_name='images_set', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='umkm_images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.umkm.name} ({self.id})"
    
    class Meta:
        # Don't create separate add/change/delete/view permissions for UMKMImage
        default_permissions = ()
