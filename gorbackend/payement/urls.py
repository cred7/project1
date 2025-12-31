from django.urls import path
from .views import InitiatePaymentView, mpesa_callback

urlpatterns = [
    path("initiate/", InitiatePaymentView.as_view(), name="initiate-payment"),
    path("mpesa/callback/", mpesa_callback, name="mpesa-callback"),
]
