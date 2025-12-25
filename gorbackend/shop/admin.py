from django.contrib import admin
from .models import Product,Order,OrderItem

# Register your models here.
class OrderInline(admin.TabularInline):
    model = OrderItem
    extra =1

class Ordertadmin(admin.ModelAdmin):
    inlines = [OrderInline]

admin.site.register(Order,Ordertadmin)
admin.site.register(Product)