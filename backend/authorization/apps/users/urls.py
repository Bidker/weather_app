from django.conf.urls import url
from django.urls import include
from rest_framework import routers

from apps.users.views import UserViewSet

app_name = 'users'

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    url('', include(router.urls)),
]
