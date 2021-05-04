# Generated by Django 3.1.2 on 2021-05-03 22:46

from django.db import migrations
from django.utils import timezone


def create_crone_task(apps, schema_editor):
    from django_q.models import Schedule

    Schedule.objects.create(
        func='weatherwoman.tasks.send_daily_email',
        schedule_type=Schedule.DAILY, next_run=timezone.now().replace(hour=8, minute=0),
    )


def reverse_crone_task(apps, schema_editor):
    pass


class Migration(migrations.Migration):
    dependencies = [
    ]

    operations = [
        migrations.RunPython(create_crone_task, reverse_crone_task)
    ]