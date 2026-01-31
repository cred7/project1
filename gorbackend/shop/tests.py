from django.test import TestCase
from django.urls import reverse

class PlayerTests(TestCase):
    def test_player_endpoint(self):
        response = self.client.get(reverse('r-list'))
        self.assertEqual(response.status_code, 200)

class ShopTests(TestCase):
    def test_shop_endpoint(self):
        response = self.client.get(reverse('t-list'))
        self.assertEqual(response.status_code, 200)

class OrderTests(TestCase):
    def test_order_endpoint(self):
        response = self.client.get(reverse('f-list'))
        self.assertEqual(response.status_code, 200)
# Create your tests here.
