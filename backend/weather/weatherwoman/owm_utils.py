from datetime import timedelta

from django.conf import settings
from django.utils import timezone
from pyowm import OWM


class ApiOWM:
    _client = None
    _refresh_time = None

    @classmethod
    def get_client_object(cls):
        if cls._refresh_time and cls._refresh_time < timezone.now():
            del cls._client
            cls._client = None

        if cls._client is None:
            cls._client = OWM(settings.WEATHERMAP_ID).weather_manager()
            cls._refresh_time = timezone.now() + timedelta(minutes=15)

        return cls._client


class WeatherFor:
    def __init__(self, locations):
        self.http_client = ApiOWM.get_client_object()
        self.locations = locations

    def get_forecasts(self):
        return [
            (location, self.http_client.weather_at_place(location).weather)
            for location in self.locations
        ]
