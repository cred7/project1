from django.urls import path ,include
from rest_framework.routers import DefaultRouter
from .views import ProductViewset,OrderViewset,UserOrderViewset


router = DefaultRouter()

router.register(r"order",OrderViewset, basename='r')
router.register(r"one",UserOrderViewset, basename='f')
router.register(r"",ProductViewset, basename='t')

urlpatterns = router.urls


