from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes


from .models import PaymentTransaction
from .serializers import InitiatePaymentSerializer
from .mpesa import stk_push
from tickets.models import TicketTemplate
from tickets.services import create_tickets_from_transaction  # we'll define this


class InitiatePaymentView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = InitiatePaymentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        template = TicketTemplate.objects.get(
            id=serializer.validated_data["template_id"]
        )
        quantity = serializer.validated_data["quantity"]
        phone = serializer.validated_data["phone_number"]
        buyer = serializer.validated_data["buyer"]

        if template.remaining < quantity:
            return Response(
                {"message": "Not enough tickets remaining"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        amount = template.price * quantity

        mpesa_response = stk_push(phone, amount,buyer, f"TICKET-{template.id}")

        # tx = PaymentTransaction.objects.create(
        #     buyer=request.user,
        #     template=template,
        #     quantity=quantity,
        #     phone_number=phone,
        #     amount=amount,
        #     merchant_request_id=mpesa_response["MerchantRequestID"],
        #     checkout_request_id=mpesa_response["CheckoutRequestID"],
        # )
        create_tickets_from_transaction(buyer,template,quantity)

        return Response(
            {
                # "transaction_id": tx.checkout_request_id,
                
                "status": "PENDING",
                "message": f"STK Push sent to phone: {mpesa_response.message}",
            },
            status=status.HTTP_201_CREATED,
        )


@csrf_exempt
@api_view(["POST"])
# @permission_classes AllowAny
def mpesa_callback(request):
    data = request.data
    stk = data["Body"]["stkCallback"]

    checkout_id = stk["CheckoutRequestID"]
    result_code = stk["ResultCode"]

    try:
        tx = PaymentTransaction.objects.get(
            checkout_request_id=checkout_id
        )
    except PaymentTransaction.DoesNotExist:
        return Response({"error": "Transaction not found"}, status=404)

    if result_code == 0:
        tx.status = "SUCCESS"
        tx.save()

        # CREATE TICKETS HERE
        # create_tickets_from_transaction(tx)

    else:
        tx.status = "FAILED"
        tx.save()

    return Response({"status": "ok"})
