from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)

    followed_cities = models.ManyToManyField(to='authorization.City', related_name='users', blank=True)

    REQUIRED_FIELDS = []

    class Meta:
        db_table = 'users_user'


class City(models.Model):
    name = models.CharField(max_length=64)

    class Meta:
        db_table = 'followed_cities_city'
