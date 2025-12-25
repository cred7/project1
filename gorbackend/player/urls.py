from .views import PlayerViewSet

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', PlayerViewSet, basename='player')   

urlpatterns = router.urls