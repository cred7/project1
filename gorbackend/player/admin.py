from django.contrib import admin
from .models import Player

# Register your models here

class PlayerAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'position', 'team', 'number')
    search_fields = ('first_name', 'last_name', 'team')
    list_filter = ('position', 'team')

admin.site.register(Player, PlayerAdmin)

