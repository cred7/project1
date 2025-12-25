from django.contrib import admin
from .models import TicketTemplate, PurchasedTicket, Event

# Register your models here.
class TicketsInline(admin.TabularInline):
    model = TicketTemplate
    extra = 1
class EventAdmin(admin.ModelAdmin):
    inlines = [TicketsInline]

admin.site.register(Event, EventAdmin)
admin.site.register(PurchasedTicket)
