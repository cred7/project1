from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.authentication import JWTAuthentication

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get("access_token")
        if not token:
            return None
        validated_token = self.get_validated_token(token)
        return self.get_user(validated_token), validated_token

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','email', 'name', 'password', 'role')
        extra_kwargs = { 'id': {'read_only':True}, 'password':{'write_only':True}}

    def create(self, validated_data):
        return User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data['name'],
            role=validated_data.get('role', 'fan')
        )
