from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from django.utils.decorators import method_decorator
from silk.profiling.profiler import silk_profile
from .models import Event, TicketTemplate, PurchasedTicket
from .serializers import (
    EventSerializer,
    PurchasedTicketSerializer,
    TicketConfirmSerializer,
    TickoSerializer,
    TikitiSerializer,ttickets
)
import requests

# Simple home endpoint for updating the event and its ticket types by admin 
# @method_decorator(silk_profile(name="Home"), name="dispatch")
class Home(viewsets.ModelViewSet):
    queryset = TicketTemplate.objects.all()
    permission_classes = [AllowAny]
    lookup_field = 'eventId'
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return TikitiSerializer 
        return TickoSerializer
    
    def get_queryset(self):
        if self.action in ['create', 'update', 'partial_update']:
            return Event.objects.all()
        return super().get_queryset()

# Event endpoints
# @method_decorator(silk_profile(name="EventViewSet"), name="dispatch")
class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [AllowAny]  # No restriction, anyone can create/list/update


# TicketTemplate for creating ticket templates endpoints (ticket tiers)
# @method_decorator(silk_profile(name="TicketTemplateViewSet"), name="dispatch")
class TicketTemplateViewSet(viewsets.ModelViewSet): 
    queryset = Event.objects.prefetch_related('ticket_types').order_by('-date')
    serializer_class = ttickets
    lookup_field = 'slug'
    permission_classes = [AllowAny]  

    @silk_profile(name="TicketTemplateViewSet.dispatch")
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


# PurchasedTicket endpoints (buying, confirming, scanning)
# @method_decorator(silk_profile(name="PurchasedTicketViewSet"), name="dispatch")
class PurchasedTicketViewSet(viewsets.ModelViewSet):
    queryset = PurchasedTicket.objects.all()
    serializer_class = PurchasedTicketSerializer
    permission_classes = [AllowAny]  
    lookup_field = 'ticket_code' # Anyone can buy a ticket

    def get_serializer_class(self):
        if self.action in ['update', 'partial_update','delete']:
            return TicketConfirmSerializer
        return super().get_serializer_class()
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        tickets = serializer.save()  # LIST comes back here
        
        output_serializer = self.get_serializer(tickets, many=True)

        return Response(
            output_serializer.data,
            status=status.HTTP_201_CREATED
        )

    # Commented out create function for billing integration
    # def create(self, request, *args, **kwargs):
    #     phone_number = request.data.get('phone_number')
    #     if not phone_number:
    #         return Response({"error": "Phone number is required for billing"}, status=status.HTTP_400_BAD_REQUEST)
        
    #     # Assume billing API endpoint and logic
    #     billing_url = "https://billing-service.example.com/charge"
    #     billing_data = {
    #         "phone_number": phone_number,
    #         "amount": 400,  # Implement calculate_amount based on tickets
    #     }
        
    #     response = requests.post(billing_url, json=billing_data)
    #     if response.status_code != 200:
    #         return Response({"error": "Billing failed"}, status=status.HTTP_400_BAD_REQUEST)
        
    #     # If billing successful, proceed with ticket creation
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     tickets = serializer.save()
    #     response_serializer = PurchasedTicketResponseSerializer(tickets, many=True)
    #     return Response(response_serializer.data, status=status.HTTP_201_CREATED)

