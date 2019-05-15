from django.contrib import admin
from .models import *

class m_events(admin.ModelAdmin):
    list_display = ('id', 'title', 'rating', 'accepted', 'thumbnail', 'event_date')
admin.site.register(Event, m_events)

class m_events_datas(admin.ModelAdmin):
    list_display = ('id', 'event', 'data_type', 'file')
admin.site.register(EventData)

class m_events_votes(admin.ModelAdmin):
    list_display = ('id', 'user', 'event', 'vote_type')
admin.site.register(EventVote)
