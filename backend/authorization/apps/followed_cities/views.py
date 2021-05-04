from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from apps.followed_cities.models import City
from apps.followed_cities.serializers import FollowedCitiesSerializer


class CitiesViewSet(mixins.CreateModelMixin, GenericViewSet):
    permission_classes = (IsAuthenticated,)

    queryset = City.objects.all()
    serializer_class = FollowedCitiesSerializer

    def perform_create(self, serializer):
        city = serializer.save()
        self.request.user.followed_cities.add(city)
