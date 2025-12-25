from rest_framework import serializers
from .models import Player
from rest_framework_simplejwt.authentication import JWTAuthentication

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get("access_token")
        if not token:
            return None
        validated_token = self.get_validated_token(token)
        return self.get_user(validated_token), validated_token

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = [
            'id',
            'first_name',
            'last_name',
            'position',
            'team',
            'number',
            'nationality',
            'dob',
            'height',
            'weight',
            'bio',
            'thumbnails',
            'slug',
        ]
        read_only_fields = ['slug',]
        
def create(self, validated_data):
        # You can still access the authenticated user if needed
        print (self.request)
        user = self.context['request'].user
        print(validated_data)
        # Here we don't attach it to Player because model has no user field
        return super().create(validated_data)

def update(self, instance, validated_data):
        # Example: allow only authenticated users to update
        user = self.context['request'].user
        # Can add more custom logic here if needed
        return super().update(instance, validated_data)