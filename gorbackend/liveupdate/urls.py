# matches/urls.py
from django.urls import path
from .views import UpdateScoreAPIView, MatchViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', MatchViewSet, basename='match')

urlpatterns = [
    path('update-score/<int:match_id>/', UpdateScoreAPIView.as_view(), name="update-score"),
    path('update-score/', UpdateScoreAPIView.as_view(), name="update-score"),
] + router.urls
