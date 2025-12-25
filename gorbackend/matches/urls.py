from .views import MatchViewSet

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', MatchViewSet, basename='player')   

urlpatterns = router.urls