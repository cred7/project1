# matches/models.py
from django.db import models

class Match(models.Model):
    # Teams
    teamA = models.CharField(max_length=50)
    teamB = models.CharField(max_length=50)

    # Scores
    teamA_score = models.PositiveIntegerField(default=0)
    teamB_score = models.PositiveIntegerField(default=0)

    # Match progress
    current_minute = models.PositiveIntegerField(default=0)
    status = models.CharField(max_length=20, default="scheduled")  # scheduled, live, finished

    # Optional
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.teamA} vs {self.teamB}"
