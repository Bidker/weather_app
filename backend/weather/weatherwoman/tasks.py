from django.contrib.auth import get_user_model
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django_q.tasks import async_task
from django.core.mail import send_mail

from weatherwoman.owm_utils import WeatherFor

User = get_user_model()


def send_mail_to_user(user_pk):
    user = User.objects.get(pk=user_pk)
    cities_names = user.followed_cities.values_list('name', flat=True)
    forecasts = WeatherFor(cities_names).get_forecasts()

    html_message = render_to_string('mail_template.html', {'forecasts': forecasts})
    plain_message = strip_tags(html_message)

    send_mail(
        'Daily weather mail',
        plain_message,
        'weather@noreply.pl',
        [user.email]
    )


def send_daily_email():  # TODO: Rename
    users = User.objects.filter(followed_cities__isnull=False).all()

    for user in users:
        async_task(send_mail_to_user, user.pk)
