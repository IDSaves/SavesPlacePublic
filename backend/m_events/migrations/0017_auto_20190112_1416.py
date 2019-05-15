# Generated by Django 2.0.6 on 2019-01-12 14:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('m_events', '0016_event_rating'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='event_type',
            field=models.CharField(choices=[('MEM', 'Meme'), ('WOR', 'World'), ('SPT', 'Sport'), ('ART', 'Art'), ('MUS', 'Music'), ('SCI', 'Science'), ('GAM', 'Games')], default='MEM', max_length=3),
        ),
    ]