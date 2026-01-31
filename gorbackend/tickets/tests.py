from django.test import TestCase
from django.urls import reverse


class TicketTests(TestCase):
    def test_ticket_endpoint(self):
        response = self.client.get(reverse('events-list'))
        self.assertEqual(response.status_code, 200)

# class EventTests(TestCase):
#     def test_event_endpoint(self):
#         response = self.client.get(reverse('getticket-detail', args=[1]))
#         self.assertEqual(response.status_code, 200)

# Create your tests here.
