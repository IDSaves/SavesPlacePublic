from django.db import models
from django.utils import timezone

from django.contrib.auth.models import User
from django.utils.deconstruct import deconstructible
from django.utils.translation import ugettext_lazy as _

import os, uuid, random

@deconstructible
class RandomFileName(object):
    def __init__(self, path):
        self.path = os.path.join(path, "%s%s")

    def __call__(self, _, filename):
        # @note It's up to the validators to check if it's the correct file type in name or if one even exist.
        extension = os.path.splitext(filename)[1]
        return self.path % (uuid.uuid4(), extension)

class Event(models.Model):
    author        = models.ForeignKey(User, on_delete=models.CASCADE)
    title         = models.CharField(max_length=50)
    thumbnail     = models.FileField(upload_to=RandomFileName('events_thumbnails/'), default='events_thumbnails/_default.svg')
    thumb_color   = models.CharField(max_length=10)

    rating        = models.IntegerField(default=0)

    accepted      = models.BooleanField(default=False)
    accepted_by   = models.IntegerField(default=-1)
    accept_date   = models.DateTimeField(default=timezone.now)

    rejected      = models.BooleanField(default=False)
    rejected_by   = models.IntegerField(default=-1)
    reject_date   = models.DateTimeField(default=timezone.now)

    event_date    = models.DateField(default=timezone.now)
    publish_date  = models.DateField(default=timezone.now)

    event_type    = models.CharField(
        max_length=3,
        choices=(
            ('MEM', 'Meme'),
            ('WOR', 'World'),
            ('SPT', 'Sport'),
            ('ART', 'Art'),
            ('MUS', 'Music'),
            ('SCI', 'Science'),
            ('GAM', 'Games'),
            ('MDA', 'Media')
        ),
        default="MEM"
    )

    def __str__(self):
        return "%s" % (self.title)

class EventData(models.Model):
    event          = models.ForeignKey(Event, on_delete = models.CASCADE)
    data_type      = models.CharField(
        max_length=4,
        choices=(
            ('TXT', 'Text'),
            ('GIMG', 'Gif/Image'),
            ('VID', 'Video'),
        ),
        default="TXT"
    )
    data           = models.TextField()

    def __str__(self):
        return "#%s's event data" % (self.event.id)

class EventVote(models.Model):
    user           = models.ForeignKey(User, on_delete = models.CASCADE)
    event          = models.ForeignKey(Event, on_delete = models.CASCADE)
    vote_type      = models.BooleanField(default = False)

    def __str__(self):
        return "#%s's event vote" % (self.event.id)
