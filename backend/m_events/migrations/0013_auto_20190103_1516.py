# Generated by Django 2.0.6 on 2019-01-03 15:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('m_events', '0012_auto_20190103_1513'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eventdata',
            name='data_type',
            field=models.CharField(choices=[('TXT', 'Text'), ('GIMG', 'Gif/Image'), ('VID', 'Video')], default='TXT', max_length=3),
        ),
    ]
