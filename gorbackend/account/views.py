from rest_framework import generics, permissions,status
from rest_framework.response import Response
from .serializers import RegisterSerializer, CookieJWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from datetime import timedelta
from django.utils import timezone

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]
    

class MeView(generics.RetrieveAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

    def get_object(self):
        return self.request.user

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role  # include role in token
        return token
    


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.user

        tokens = serializer.validated_data  # contains refresh + access
        access_token = str(tokens.get("access"))
        refresh_token = str(tokens.get("refresh"))

        response = Response({"acces": access_token})

        max_age = 60* 60  # 7 days
        expires = timezone.now() + timedelta(seconds=max_age)

        # Access token cookie
        response.set_cookie(
            "access_token",
            access_token,
            # max_age=max_age,
            expires=expires,
            httponly=True,    # JS cannot read it
            secure=False,     # True in production with HTTPS
            samesite="Lax",   # adjust based on your frontend
        )

        # Refresh token cookie
        response.set_cookie(
            "refresh_token",
            refresh_token,
            max_age=max_age,
            # expires=expires,
            httponly=True,
            secure=False,
            samesite="Lax",
        )

        return response


       

        
