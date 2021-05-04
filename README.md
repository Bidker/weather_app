# weather_app

1. Python Weather App

## Requirements

1. Python 3.8
1. Database: Postgres
1. Docker
1. Docker-compose
1. Angular CLI: 11.2.11
1. Node: 10.19.0

## Development

Run dev:
1. (required for email) ``cp backend/local_settings_example.py backend/weather/authorization/local_settings.py``
1. Set email settings in ``backend/weather/authorization/local_settings.py``
1. ``cd backend``
1. ``docker-compose up -d``
1. ``cd ../frontend``
1. ``ng serve``
