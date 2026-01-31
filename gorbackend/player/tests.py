
from django.test import TestCase
from django.urls import reverse



class PlayerTests(TestCase):
    def test_player_endpoint(self):
        response = self.client.get(reverse('player-list'))
        self.assertEqual(response.status_code, 200)
# Create your tests here.
