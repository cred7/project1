from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Match
from .serializers import MatchSerializer


class MatchViewSet(ModelViewSet):
    queryset = Match.objects.all().order_by('-match_date')
    serializer_class = MatchSerializer
    lookup_field = 'slug'

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]
