# matches/urls.py
from django.urls import path
from .views import UpdateScoreAPIView

urlpatterns = [
    path('update-score/<int:match_id>/', UpdateScoreAPIView.as_view(), name="update-score"),
]
