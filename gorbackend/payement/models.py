from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth import get_user_model
from django.conf import settings
from tickets.models import TicketTemplate

User = settings.AUTH_USER_MODEL


class PaymentTransaction(models.Model):
    STATUS_CHOICES = (
        ("PENDING", "Pending"),
        ("SUCCESS", "Success"),
        ("FAILED", "Failed"),
    )

    buyer = models.CharField(max_length=100)
    template = models.ForeignKey(TicketTemplate, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    phone_number = models.CharField(max_length=15)
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    merchant_request_id = models.CharField(max_length=100, blank=True)
    checkout_request_id = models.CharField(max_length=100, unique=True)

    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default="PENDING"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.checkout_request_id} - {self.status}"
