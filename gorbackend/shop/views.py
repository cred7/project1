from rest_framework import viewsets
from django.views.generic import ListView
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from account.models import User
from .models import Product, Order, OrderItem
from .serializers import ProductSerializer,OrderSerializer, ProductPurchaseSerializer,UserSerializer


class ProductViewset(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny] 
       # Normal CRUD serializer
    @action(detail=True, methods=["put"],permission_classes=[AllowAny])
    def purchase(self, request, pk=None):
        product = self.get_object()
        serializer = ProductPurchaseSerializer(
            product,
            data=request.data,
            partial=True,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

class OrderViewset(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    lookup_field = 'user'
    permission_classes = [AllowAny]

class UserOrderViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'name'
    permission_classes = [AllowAny]