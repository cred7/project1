from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'admin'

class IsEditorOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role in ['editor', 'admin']
