from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser   

from .models import Player
from .serializers import PlayerSerializer,CookieJWTAuthentication

class PlayerViewSet(ModelViewSet):
    queryset = Player.objects.all().order_by('first_name')
    serializer_class = PlayerSerializer
    authentication_classes = [CookieJWTAuthentication]

    lookup_field = 'slug'

    def get_serializer_class(self):
        return super().get_serializer_class()

    def get_permissions(self):
        # print("self.request.user")
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        # Only authenticated staff can create/update/delete
        return [IsAdminUser()]
    
