# Generated by Django 2.0.6 on 2018-12-08 18:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('m_users', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='last_ip',
        ),
        migrations.RemoveField(
            model_name='account',
            name='reg_ip',
        ),
        migrations.AddField(
            model_name='account',
            name='jwt_secret',
            field=models.FloatField(default=0.546, max_length=0.6982245689875984),
            preserve_default=False,
        ),
    ]
