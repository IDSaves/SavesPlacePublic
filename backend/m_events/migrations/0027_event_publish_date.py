# Generated by Django 2.0.3 on 2019-01-18 22:43

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('m_events', '0026_remove_event_publish_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='publish_date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
