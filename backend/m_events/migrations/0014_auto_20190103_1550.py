# Generated by Django 2.0.6 on 2019-01-03 15:50

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('m_events', '0013_auto_20190103_1516'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='date',
            new_name='event_date',
        ),
        migrations.AddField(
            model_name='event',
            name='publish_date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]