# Generated by Django 2.0.6 on 2019-01-02 21:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('m_events', '0010_auto_20181223_1034'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='thumb_color',
            field=models.CharField(default=1, max_length=10),
            preserve_default=False,
        ),
    ]