from django.urls import re_path
from .consumers import LiveScoreConsumer, ChatConsumer

websocket_urlpatterns = [
    re_path(r"ws/scores/(?P<match_id>\w+)/$", LiveScoreConsumer.as_asgi()),
    re_path(r"ws/chat/(?P<match_id>\w+)/$", ChatConsumer.as_asgi()),
]
