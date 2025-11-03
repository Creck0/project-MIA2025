from django.contrib import admin
from .models import UMKM, UMKMImage


class UMKMImageInline(admin.TabularInline):
    model = UMKMImage
    extra = 1
    # Make uploaded_at readonly only for existing inline instances
    readonly_fields = ()

    def get_readonly_fields(self, request, obj=None):
        # When editing an existing UMKM (obj is not None), show uploaded_at as readonly
        if obj is not None:
            return ('uploaded_at',)
        return ()

    # Allow users who can add/change UMKM to manage UMKMImage inlines
    def has_add_permission(self, request, obj=None):
        user = request.user
        if user and user.is_authenticated:
            return user.has_perm('api.add_umkm') or user.has_perm('api.change_umkm') or user.is_superuser
        return False

    def has_change_permission(self, request, obj=None):
        user = request.user
        if user and user.is_authenticated:
            return user.has_perm('api.change_umkm') or user.is_superuser
        return False

    def has_delete_permission(self, request, obj=None):
        user = request.user
        if user and user.is_authenticated:
            return user.has_perm('api.change_umkm') or user.is_superuser
        return False


@admin.register(UMKM)
class UMKMAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'phone', 'email', 'created_at')
    search_fields = ('name', 'address', 'phone', 'email')
    readonly_fields = ('created_at', 'updated_at')
    inlines = [UMKMImageInline]
