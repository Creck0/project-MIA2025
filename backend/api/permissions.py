from rest_framework import permissions


class IsAdminWithChangeUMKM(permissions.BasePermission):
    """Allow unsafe methods only for authenticated users with 'api.change_umkm' permission.

    Safe methods (GET, HEAD, OPTIONS) are allowed for anyone.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        user = request.user
        return bool(
            user
            and user.is_authenticated
            and (user.has_perm('api.change_umkm') or user.has_perm('api.add_umkm'))
        )
