from rest_framework import serializers
from .models import TicketTemplate, PurchasedTicket, Event


#events only
class EventSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = Event
        fields = ["id", "name","team_a","team_b" ,"venue", "date", "capacity", "slug"]
        read_only_fields = ['capacity', 'slug']


#buying of tickets
class PurchasedTicketSerializer(serializers.ModelSerializer):
    template_name = serializers.CharField(source="template.name", read_only=True)
    event_name = serializers.CharField(source="template.event.name", read_only=True)
    # code = serializers.UUIDField(required=False, write_only=True)
    quantity = serializers.IntegerField(required = False, write_only =True)
    class Meta:
        model = PurchasedTicket
        fields = [
            "id",
            "template",
            "template_name",
            "event_name",
            "buyer",
            "ticket_code",
            "purchased_at",
            # "code",
            "status",
            "quantity"
            
        ] 
        read_only_fields = ["id", "purchased_at","ticket_code", "status"]
    
    def create(self, validated_data):
        buyer = validated_data["buyer"]
        template = validated_data["template"]
        quantity = validated_data.get('quantity', 1)  # Default to 1 if not provided
        # Check availability
        if template.remaining < quantity:
            raise serializers.ValidationError(
                f"Only {template.remaining} tickets remaining."
            )

        tickets = [
            PurchasedTicket(
                template=template,
                buyer=buyer,
                status="confirmed",
            )
            for _ in range(quantity)
        ]

        created_tickets = PurchasedTicket.objects.bulk_create(tickets)

        return created_tickets

# confirming of tickets through scanning
class TicketConfirmSerializer(serializers.ModelSerializer):
    template_name = serializers.CharField(source="template.name", read_only=True)
    event_name = serializers.CharField(source="template.event.name", read_only=True)
    
    class Meta:
        model = PurchasedTicket
        fields = [ 
            "id",
            "template_name",
            "event_name",
            "buyer",
            "ticket_code",
            "purchased_at",
            "status",]
        read_only_fields = ["id","buyer","ticket_code","purchased_at",]

    def update(self, instance, validated_data):
        status = validated_data.get("status")        
        if status and instance.status == "confirmed":
            if status == "cancelled":
                instance.status = "cancelled"
                instance.save()
            elif status == "used":
                instance.status = "used"
                instance.save()
            else:
                raise serializers.ValidationError("Invalid status transition.")
        else: raise serializers.ValidationError("ticket already used.")
        return instance


# updating the ticket events and tickettypes together
class TikitiSerializer(serializers.ModelSerializer):
    class createEventserializer(serializers.ModelSerializer):
        class Meta:
            model = TicketTemplate
            fields = [
                "name",
                "price",
                "total_available",
                "seat_section",
                ] 
    ticket_types = createEventserializer(many=True,required=False)

    def create(self, validated_data):
        event_data = validated_data.pop("ticket_types")
        event = Event.objects.create(**validated_data)
        for et_data in event_data:
            TicketTemplate.objects.create(event=event, **et_data)
        return event
    
    def update(self, instance, validated_data):
        ticket_types_data = validated_data.pop("ticket_types",[])
        # print("Validated Data:", validated_data)
        # print("Ticket Types Data:", ticket_types_data)
                
        # Update event fields
        instance.name = validated_data.get("name", instance.name)
        instance.venue = validated_data.get("venue", instance.venue)
        instance.date = validated_data.get("date", instance.date)
        instance.team_a = validated_data.get("date", instance.team_a)
        instance.team_b = validated_data.get("date", instance.team_b)
        
        instance.save()

        instance = super().update(instance, validated_data)

        # Update ticket types
        for et_data in ticket_types_data:
            et_name = et_data.get("name", None)
            if et_name:
                et_instance = TicketTemplate.objects.get(name=et_name, event=instance)
                et_instance.name = et_data.get("name", et_instance.name)
                et_instance.price = et_data.get("price", et_instance.price)
                et_instance.total_available = et_data.get("total_available", et_instance.total_available)
                et_instance.seat_section = et_data.get("seat_section", et_instance.seat_section)
                et_instance.save()
            else:
                TicketTemplate.objects.create(event=instance, **et_data)

        return instance

    class Meta:
            model = Event
            fields = ["name", 'slug',"venue", "date","team_a", "team_b", "capacity","ticket_types"]
            read_only_fields = ['capacity', 'slug']
# only getting all the details of a ticket type with its associated event and tickets info
class TickoSerializer(serializers.ModelSerializer):
    remaining = serializers.IntegerField(read_only=True)
    eventName = serializers.CharField(source="event.name", read_only=True)
    evenVenue = serializers.CharField(source="event.venue", read_only=True)
    eventDate = serializers.DateTimeField(source="event.date", read_only=True)
    eventId = serializers.IntegerField(source="event.id", read_only=True)
    class Meta:
        model = TicketTemplate
        fields = [
            "id",
            "eventId",
            "eventName",
            "evenVenue",
            "eventDate",
            "name",
            "price",
            "total_available",
            "seat_section",
            "remaining",
        ]
        read_only_fields = ["remaining"]

# creating ticket template and events
class ttickets(serializers.ModelSerializer):

    class s(serializers.ModelSerializer):
        class Meta:
            model = TicketTemplate
            fields = [
                "id",
                "name",
                "price",
                "total_available",
                "seat_section",
                "remaining",  # optional property
        ]
        read_only_fields = ["remaining"]
                

    ticket_types = s(many=True,read_only=False)
    class Meta:
        model = Event
        fields = [
            "name",
            "venue",
            "date",
            "team_a",
            "team_b",
            "capacity",
            "ticket_types",
            'slug'
            
        ]
        read_only_fields = [ 'capacity', 'slug']



    
