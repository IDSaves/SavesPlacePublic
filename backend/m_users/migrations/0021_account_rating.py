# Generated by Django 2.0.6 on 2019-01-04 18:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('m_users', '0020_account_avatar'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='rating',
            field=models.IntegerField(default=0),
        ),
    ]
