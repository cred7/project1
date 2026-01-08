# matches/serializers.py
from rest_framework import serializers
from .models import Match

class UpdateScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ['teamA_score', 'teamB_score', 'current_minute', 'status']
