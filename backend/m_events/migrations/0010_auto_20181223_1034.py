# Generated by Django 2.0.6 on 2018-12-23 10:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('m_events', '0009_auto_20181223_1025'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='event_type',
            field=models.CharField(choices=[('MEM', 'Meme'), ('WOR', 'World'), ('SPT', 'Sport'), ('ART', 'Art'), ('MUS', 'Music'), ('SCI', 'Science')], default='MEM', max_length=3),
        ),
        migrations.AlterField(
            model_name='eventdata',
            name='data_type',
            field=models.CharField(choices=[('TXT', 'Text'), ('IMG', 'Image'), ('VID', 'Video'), ('GIF', 'Gif')], default='TXT', max_length=3),
        ),
    ]
