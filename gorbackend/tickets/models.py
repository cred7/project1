from django.db import models
from django.utils.text import slugify
# from django.contrib.auth import get_user_model
import uuid
from django.conf import settings
from django.db.models import Sum
User = settings.AUTH_USER_MODEL

# User = get_user_model()

class Event(models.Model):
    name = models.CharField(max_length=200)
    venue = models.CharField(max_length=200)
    date = models.DateTimeField()
    # capacity = models.PositiveIntegerField()
    team_a = models.CharField(max_length=255)
    team_b = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.team_a + self.team_b)
        super().save(*args, **kwargs)

    @property
    def capacity(self):
        return self.ticket_types.aggregate(total=Sum('total_available'))['total'] or 0

    def __str__(self):
        return self.name



class TicketTemplate(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="ticket_types")
    class StatusChoice(models.TextChoices):
        VIP = 'VIP'
        REGULAR = 'Regular'
        STUDENTS = 'Students'
    
    name = models.CharField(max_length=100, choices=StatusChoice, default=StatusChoice.REGULAR)  # e.g. "VIP", "Regular", "Student"
    price = models.DecimalField(max_digits=10, decimal_places=2)
    total_available = models.PositiveIntegerField()
    
    # Optional category info
    seat_section = models.CharField(max_length=50, null=True, blank=True)
    
    def __str__(self):
        return f"{self.name} - {self.event.name}"

    @property
    def remaining(self):
        sold_count = PurchasedTicket.objects.filter(template=self).count()
        return self.total_available - sold_count

class PurchasedTicket(models.Model):
    template = models.ForeignKey(TicketTemplate, on_delete=models.CASCADE, related_name="purchased_tickets")
    buyer = models.CharField(max_length=100)
    # Unique per ticket
    ticket_code = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    # Status
    STATUS_CHOICES = [
        ("confirmed", "Confirmed"),
        ("used", "Used"),
        ("cancelled", "Cancelled"),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="confirmed")
    purchased_at = models.DateTimeField(auto_now_add=True)

    # def scan(self):
    #     """Move ticket from pending to confirmed"""
    #     if self.status != "pending":
    #         raise ValueError("Only pending tickets can be confirmed.")
    #     self.status = "confirmed"
    #     self.save()

    def __str__(self):
        return f"{self.template.name} - {self.ticket_code}"
