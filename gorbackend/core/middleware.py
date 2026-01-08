from django.http import HttpResponse
from rest_framework.permissions import SAFE_METHODS
from rest_framework.permissions import IsAuthenticated

class AllowOptionsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.method == "OPTIONS":
            response = HttpResponse()
            response.status_code = 200
            return response
        return self.get_response(request)
from django.http import HttpResponse

class ForceOptionsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.method == "OPTIONS":
            response = HttpResponse(status=200)
            response["Access-Control-Allow-Origin"] = request.headers.get("Origin", "*")
            response["Access-Control-Allow-Methods"] = "GET, POST, PUT, PATCH, DELETE, OPTIONS"
            response["Access-Control-Allow-Headers"] = "authorization, content-type"
            response["Access-Control-Allow-Credentials"] = "true"
            return response

        return self.get_response(request)



class AllowUnauthenticatedOptions(IsAuthenticated):
    def has_permission(self, request, view):
        if request.method == "OPTIONS":
            return True
        return super().has_permission(request, view)
