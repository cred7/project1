# matches/serializers.py
from rest_framework import serializers
from .models import Match

class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ['id', 'teamA', 'teamB', 'teamA_score', 'teamB_score', 'current_minute', 'status', 'date']

class UpdateScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ['teamA_score', 'teamB_score', 'current_minute', 'status']
