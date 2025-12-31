from rest_framework import serializers
from tickets.models import TicketTemplate


class InitiatePaymentSerializer(serializers.Serializer):
    template_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1, default=1)
    phone_number = serializers.CharField()
    buyer = serializers.CharField()

    def validate_template_id(self, value):
        if not TicketTemplate.objects.filter(id=value).exists():
            raise serializers.ValidationError("Invalid ticket template.")
        return value
