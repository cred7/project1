from rest_framework import serializers
from matches.models import Match

class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = [
            'id',
            'title',
            'description',
            'team_a',
            'team_b',
            'match_date',
            'slug',
            'created_at',
        ]
        read_only_fields = ['slug', 'created_at']
        

    def update(self, instance, validated_data):
        request = self.context.get('request')

        if not request or not request.user.is_staff:
            raise serializers.ValidationError("Only staff users can update.")

        validated_data.pop('slug', None)
        return super().update(instance, validated_data)
