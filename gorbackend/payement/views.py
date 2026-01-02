from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from django.db import transaction

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

        # tx = PaymentTransaction.objects.create(
        #         buyer=request.user,
        #         template=template,
        #         quantity=quantity,
        #         phone_number=phone,
        #         amount=amount,
        #     )
        # create_tickets_from_transaction(buyer,template,quantity)
        mpesa_response = stk_push(phone,buyer, amount, f"TICKET-{template.id}")
        # if not mpesa_response or "CheckoutRequestID" not in mpesa_response:
        #     tx.status = "FAILED"
        #     tx.save()
        #     return Response({"error": "MPesa initiation failed"}, status=400)

        # tx.merchant_request_id=mpesa_response["MerchantRequestID"],
        # txcheckout_request_id=mpesa_response["CheckoutRequestID"],
        # tx.save
        print(mpesa_response)

      
        create_tickets_from_transaction(buyer,template,quantity)

        return Response(
            {
                # "transaction_id": tx.checkout_request_id,
                
                "status": "PENDING",
                "message": f"STK Push sent to phone: {mpesa_response}",
            },
            status=status.HTTP_201_CREATED,
        )


@csrf_exempt
@api_view(["POST"])
# @permission_classes AllowAny
def mpesa_callback(request):
    data = request.data
    stk = data.get("Body", {}).get("stkCallback", {})
    checkout_id = stk.get("CheckoutRequestID")
    result_code = stk.get("ResultCode")

    if not checkout_id:
        return Response({"error": "Invalid callback"}, status=400)

    # try:
    #     tx = PaymentTransaction.objects.get(
    #         checkout_request_id=checkout_id
    #     )
    # except PaymentTransaction.DoesNotExist:
    #     return Response({"error": "Transaction not found"}, status=404)
    
    # if tx.status != "PENDING":
    #     return Response({"status": "already processed"}, status=200)

    with transaction.atomic():
        
        if result_code == 0:
          
            metadata = stk.get("CallbackMetadata", {}).get("Item", [])

            receipt = next(
                (i["Value"] for i in metadata if i["Name"] == "MpesaReceiptNumber"),
                None
            )

            amount_paid = next(
                (i["Value"] for i in metadata if i["Name"] == "Amount"),
                None
            )

            phone_paid = next(
                (i["Value"] for i in metadata if i["Name"] == "PhoneNumber"),
                None
            )

            # if amount_paid != tx.amount or phone_paid != tx.phone_number:
                # tx.status = "FAILED"
                # tx.result_desc = "Mismatch in callback data"
                # tx.save()
                # return Response({"status": "rejected"}, status=200)
            
            
            # tx.status = "SUCCESS"
            # tx.mpesa_receipt = receipt
            # tx.save()

            # CREATE TICKETS HERE
            # create_tickets_from_transaction(tx)

        else:
            # tx.status = "FAILED"
            # tx.save()
            print("error in the code")

    return Response({"status": f"ok {receipt}"})
