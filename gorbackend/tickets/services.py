from .models import PurchasedTicket
from django.db import transaction
from .tasks import send_ticket_email


def create_tickets_from_transaction(buyer,tx,quantity):
    tickets = [
        PurchasedTicket(
            template=tx,
            buyer=buyer,
            status="confirmed",
        )
        for _ in range(quantity)
    ]

    ticket = PurchasedTicket.objects.bulk_create(tickets)

    # tx.template.remaining -= tx.quantity
    # tx.template.save()

      # ✅ trigger celery AFTER commit
    transaction.on_commit(
        lambda: send_ticket_email.delay(buyer)
    )
