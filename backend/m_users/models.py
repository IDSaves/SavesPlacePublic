from django.db import models
from django.utils import timezone
from django.utils.deconstruct import deconstructible
from django.utils.translation import ugettext_lazy as _

from django.contrib.auth.models import User

import os, uuid, random


class Account(models.Model):
    user                   = models.OneToOneField(User, on_delete=models.CASCADE)
    nickname               = models.CharField(max_length=30, blank=True)

    avatar                 = models.IntegerField(default=1)
    emoji                  = models.CharField(max_length=1)

    verified               = models.BooleanField(default=False)

    rating                 = models.IntegerField(default=0)

    email                  = models.CharField(max_length=50)
    email_is_confirmed     = models.BooleanField(default=False)
    email_confirm_code     = models.CharField(max_length=50, default=1)

    jwt_secret             = models.FloatField(default=0.156)

    password_reset_code    = models.CharField(max_length=50, default=1)

    status                 = models.CharField(max_length=70, default='User of SavesPlace')

    staff_level            = models.IntegerField(default=0)

    is_banned              = models.BooleanField(default=False)

    reg_date               = models.DateField(editable=True, default=timezone.now)

    def __str__(self):
        return '%s(%s)' % (self.nickname, self.user)
