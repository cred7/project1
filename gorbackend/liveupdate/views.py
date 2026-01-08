# matches/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Match
from .serializer import UpdateScoreSerializer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

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
                        "teamA": serializer.data["teamA_score"],
                        "teamB": serializer.data["teamB_score"],
                        "minute": serializer.data["current_minute"],
                        "status": serializer.data["status"],
                    }
                }
            )
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
