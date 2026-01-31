from django.test import TestCase
from django.urls import reverse


class NewsTests(TestCase):
    def test_news(self):
        response = self.client.get(reverse('news-list'))
        self.assertEqual(response.status_code, 200)
        print("News endpoint is reachable.")

# Create your tests here.
