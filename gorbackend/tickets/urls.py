from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import TicketTemplateViewSet, PurchasedTicketViewSet,EventViewSet
from .views import Home

router = DefaultRouter()


router.register(r"events", EventViewSet, basename="events")
router.register(r"getticket", TicketTemplateViewSet, basename="getticket")
router.register(r"purchased", PurchasedTicketViewSet, basename="purchased")
router.register(r"updates", Home, basename="home")

urlpatterns = router.urls
