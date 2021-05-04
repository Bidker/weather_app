from django.conf.urls import url
from django.urls import include
from rest_framework import routers

from apps.followed_cities.views import CitiesViewSet

app_name = 'followed_cities'

router = routers.DefaultRouter()
router.register(r'city', CitiesViewSet, basename='city')

urlpatterns = [
    url('', include(router.urls)),
]
