# Generated by Django 2.0.6 on 2019-01-12 14:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('m_users', '0021_account_rating'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='emoji',
            field=models.CharField(default=1, max_length=1),
            preserve_default=False,
        ),
    ]
