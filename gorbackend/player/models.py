from django.db import models
from django.utils.text import slugify
from django.conf import settings
User = settings.AUTH_USER_MODEL

class Player(models.Model):
    POSITION_CHOICES = [
        ('forward', 'Forward'),
        ('midfielder', 'Midfielder'),
        ('defender', 'Defender'),
        ('goalkeeper', 'Goalkeeper'),
    ]

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255,default='')
    position = models.CharField(max_length=20, choices=POSITION_CHOICES)
    team = models.CharField(max_length=255)
    number = models.PositiveIntegerField()
    nationality = models.CharField(max_length=100, blank=True)  # player's country
    dob = models.DateField(null=True, blank=True)  # date of birth
    height = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)  # in cm or meters
    weight = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)  # in kg
    bio = models.TextField(blank=True)  # short biography
    slug = models.SlugField(unique=True, blank=True)  # auto-generated URL-friendly name
    thumbnails = models.ImageField(upload_to="players/", null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.first_name}-{self.last_name}")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.first_name} ({self.last_name})"
