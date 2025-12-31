import base64
import datetime
import requests
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings


def get_access_token():
    url = settings.MPESA_AUTH_URL
    response = requests.get(
        url,
        auth=(settings.MPESA_CONSUMER_KEY, settings.MPESA_CONSUMER_SECRET),
    )
    response.raise_for_status()
    return response.json()["access_token"]


def stk_push(phone_number,buyer, amount, reference):
    # access_token = get_access_token()
    # timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")

    # password = base64.b64encode(
    #     f"{settings.MPESA_SHORTCODE}{settings.MPESA_PASSKEY}{timestamp}".encode()
    # ).decode()

    # payload = {
    #     "BusinessShortCode": settings.MPESA_SHORTCODE,
    #     "Password": password,
    #     "Timestamp": timestamp,
    #     "TransactionType": "CustomerPayBillOnline",
    #     "Amount": int(amount),
    #     "PartyA": phone_number,
    #     "PartyB": settings.MPESA_SHORTCODE,
    #     "PhoneNumber": phone_number,
    #     "CallBackURL": settings.MPESA_CALLBACK_URL,
    #     "AccountReference": reference,
    #     "TransactionDesc": "Ticket Purchase",
    # }

    # headers = {
    #     "Authorization": f"Bearer {access_token}",
    #     "Content-Type": "application/json",
    # }

    # response = requests.post(
    #     settings.MPESA_STK_PUSH_URL, json=payload, headers=headers
    # )

    # response.raise_for_status()
    # return response.json()

     return Response(
            {"message": f"Payment initiated, complete the payment on your phone on {phone_number}, by byuyer {buyer}"},
            status=status.HTTP_200_OK,
        )
