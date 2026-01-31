
from rest_framework import serializers
from .models import Product, Order, OrderItem
from account.models import User


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "description",
            "price",
            "stock",
            "created_at",
            "merchImage"
        )

        extra_kwargs = {
            "id":{"read_only":True}
        }


class ProductPurchaseSerializer(serializers.ModelSerializer):
    quantity = serializers.IntegerField(write_only=True)
    user = serializers.CharField(write_only=True)
    class Meta:
        model = Product
        fields = ('user','id', 'name', 'stock', 'price', 'merchImage', 'quantity')
        read_only_fields = ('id', 'name', 'stock', 'price', 'merchImage')

    def update(self, instance, validated_data):
        user = validated_data['user']
        qty = validated_data['quantity']
        
        try:
            user = User.objects.get(email=user)
        except User.DoesNotExist:
            raise serializers.ValidationError ("User not found")
        
        order = Order.objects.create(
            user=user,
            total_amount=total_price)
# check if the email of the user is
        

        # Validate stock
        if qty <= 0:
            raise serializers.ValidationError("Quantity must be greater than zero.")
        if instance.stock < qty:
            raise serializers.ValidationError("Not enough stock available.")

        # Deduct stock
        instance.stock -= qty
        instance.save()

        # Calculate total price
        total_price = instance.price * qty

        # Create order
       
       

        # Create order item
        order_item = OrderItem.objects.create(
            order=order,
            product=instance,
            quantity=qty,
            price=total_price
        )

        # Store for final representation
        self.context['qty'] = qty
        self.context['total_price'] = total_price
        self.context['order'] = order
        self.context['order_item'] = order_item
        self.context['user'] = user

        return instance

    def to_representation(self, instance):
        data = super().to_representation(instance)

        data['quantity'] = self.context['qty']
        data['total_price'] = str(self.context['total_price'])

        data['order'] = {
            "id": self.context['order'].id,
            "total_amount": str(self.context['order'].total_amount),
            "created_at": self.context['order'].created_at,
            "item": {
                "product": instance.name,
                "quantity": self.context['qty'],
                "price": str(self.context['total_price'])
            }
        }

        return data

class OrderItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = [
            'order',
            'product',
            'quantity',
            'price'

        ]

class OrderSerializer(serializers.ModelSerializer):
   items = OrderItemsSerializer(many=True)
   class Meta:
       model = Order
       fields = [
        #    "user",
        #    "total_amount",
           "items"
       ]


class UserSerializer(serializers.ModelSerializer):
    orders = OrderSerializer(many=True, read_only=True)
    total_spent = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'role', 'total_spent','orders' ]

    def get_total_spent(self, obj):
        return sum(order.total_amount for order in obj.orders.all())
