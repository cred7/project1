# matches/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Match
from .serializer import UpdateScoreSerializer, MatchSerializer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

class MatchViewSet(ModelViewSet):
    queryset = Match.objects.all().order_by('date')
    serializer_class = MatchSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'


class UpdateScoreAPIView(APIView):
    """
    Called from frontend to update match scores.
    Broadcasts the update to WebSocket consumers.
    """
    def post(self, request, match_id):
        try:
            print("Match ID:", match_id)
            match = Match.objects.get(id=match_id)
            # match = 1
        except Match.DoesNotExist:
            return Response({"error": "Match not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = UpdateScoreSerializer(match, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()

            # Broadcast to WebSocket group
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                f"score_match_{match_id}",
                {
                    "type": "score_update",
                    "score": {
                       "teamA_name": match.teamA,
                        "teamA_score": serializer.data["teamA_score"],
                        "teamB_name": match.teamB,
                        "teamB_score": serializer.data["teamB_score"],
                        "minute": serializer.data["current_minute"],
                        "status": serializer.data["status"],
                    }
                }
            )
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
