from celery import shared_task
from django.core.mail import send_mail
# from payements.models import Payment

@shared_task
def send_ticket_email(buyer):
    # payment = Payment.objects.select_related("user").get(id=payment_id)
     print(f"Sending email for ticket")
     return send_mail(
        subject="Your ticket is confirmed",
        message=f"Payment {buyer} successful. Tickets attached.",
        from_email="tickets@gor.com",
        recipient_list=[buyer],
    )
# @shared_task(
#     autoretry_for=(Exception,),
#     retry_backoff=30,
#     retry_kwargs={"max_retries": 5},
# )
# def send_ticket_email(payment_id):
#     payment = Payment.objects.select_related("user").get(id=payment_id)

#     send_mail(
#         subject="Your ticket is confirmed",
#         message=f"Payment {payment.id} successful. Tickets attached.",
#         from_email="tickets@gor.com",
#         recipient_list=[payment.user.email],
#     )
