from rest_framework import serializers
from .models import News

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = [
            'id',
            'title',
            'content',
            'author',
            'thumbnail',
            'created_at',
            'updated_at',
            'slug',
        ]
        read_only_fields = ['slug', 'created_at', 'updated_at']
