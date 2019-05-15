from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.contenttypes.models import ContentType
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.utils import timezone

from django.contrib.auth.models import User
from m_events.models import Event, EventData, EventVote
from m_users.models import Account

from backend.api_funcs import *

import json, jwt, datetime, calendar, base64, os, uuid, binascii, random, time


@api_view(['GET'])
def GetStats(request):
    events = Event.objects.filter(accepted=True).count()
    rejected_submissions = Event.objects.filter(accepted=False, rejected=True).count()
    pending_submissions = Event.objects.filter(accepted=False, rejected=False).count()

    today = datetime.datetime.today()

    submissions_this_month = Event.objects.filter(publish_date__month=today.month, publish_date__year=today.year).count()

    users = Account.objects.all().count()

    return Response({
        "events": events,
        "rejected_submissions": rejected_submissions,
        "pending_submissions": pending_submissions,
        "submissions_this_month": submissions_this_month,
        "users": users
    })

@api_view(['GET'])
def GetTopUsers(request):
    users = Account.objects.all().order_by('-rating')[:15].values('id', 'nickname', 'avatar', 'rating')
    return Response(users)

@api_view(['GET'])
def CountEventTypes(request):
    MEM = Event.objects.filter(accepted=True, event_type="MEM").count()
    WOR = Event.objects.filter(accepted=True, event_type="WOR").count()
    SPT = Event.objects.filter(accepted=True, event_type="SPT").count()
    MUS = Event.objects.filter(accepted=True, event_type="MUS").count()
    SCI = Event.objects.filter(accepted=True, event_type="SCI").count()
    ART = Event.objects.filter(accepted=True, event_type="ART").count()
    GAM = Event.objects.filter(accepted=True, event_type="GAM").count()
    MDA = Event.objects.filter(accepted=True, event_type="MDA").count()
    return Response({
        'MEM': MEM,
        'WOR': WOR,
        'SPT': SPT,
        'MUS': MUS,
        'SCI': SCI,
        'ART': ART,
        'GAM': GAM,
        'MDA': MDA
    })

@api_view(['GET'])
def CountEventsLast6Months(request):
    arr = []
    now = time.localtime()
    for n in range(6):
        arr.append(time.localtime(time.mktime((now.tm_year, now.tm_mon - n, 1, 0, 0, 0, 0, 0, 0)))[:2])

    res = []
    for i in arr:
        if i[1] == 1: res.append(['January', Event.objects.filter(event_date__month=i[1], event_date__year=i[0], accepted=True).count(), i[0]])
        if i[1] == 2: res.append(['February', Event.objects.filter(event_date__month=i[1], event_date__year=i[0], accepted=True).count(), i[0]])
        if i[1] == 3: res.append(['March', Event.objects.filter(event_date__month=i[1], event_date__year=i[0], accepted=True).count(), i[0]])
        if i[1] == 4: res.append(['April', Event.objects.filter(event_date__month=i[1], event_date__year=i[0], accepted=True).count(), i[0]])
        if i[1] == 5: res.append(['May', Event.objects.filter(event_date__month=i[1], event_date__year=i[0], accepted=True).count(), i[0]])
        if i[1] == 6: res.append(['June', Event.objects.filter(event_date__month=i[1], event_date__year=i[0], accepted=True).count(), i[0]])
        if i[1] == 7: res.append(['July', Event.objects.filter(event_date__month=i[1], event_date__year=i[0], accepted=True).count(), i[0]])
        if i[1] == 8: res.append(['August', Event.objects.filter(event_date__month=i[1], event_date__year=i[0], accepted=True).count(), i[0]])
        if i[1] == 9: res.append(['September', Event.objects.filter(event_date__month=i[1], event_date__year=i[0], accepted=True).count(), i[0]])
        if i[1] == 10: res.append(['October', Event.objects.filter(event_date__month=i[1], event_date__year=i[0], accepted=True).count(), i[0]])
        if i[1] == 11: res.append(['November', Event.objects.filter(event_date__month=i[1], event_date__year=i[0], accepted=True).count(), i[0]])
        if i[1] == 12: res.append(['December', Event.objects.filter(event_date__month=i[1], event_date__year=i[0], accepted=True).count(), i[0]])

    return Response(reversed(res))
