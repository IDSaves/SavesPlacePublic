from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.contenttypes.models import ContentType
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.utils import timezone

from django.contrib.auth.models import User
from m_events.models import Event, EventData, EventVote

from backend.api_funcs import *
from m_users.models import Account

import json, jwt, datetime, calendar, base64, os, uuid, binascii, random

@api_view(['GET'])
def GetEvent(request, id):
    try:
        event = Event.objects.get(pk=id)
        event_data = EventData.objects.filter(event=event).values('data_type', 'data')
        event_pos_votes = EventVote.objects.filter(event=event, vote_type=True).count()
        event_neg_votes = EventVote.objects.filter(event=event, vote_type=False).count()
        data = []
        for i in event_data:
            data.append({
                'data': i['data'],
                'type': i['data_type']
            })
        if not event.accepted_by == -1:
            accepted_by = User.objects.get(id=event.accepted_by).account.nickname
            accepted_by_username = User.objects.get(id=event.accepted_by).username
        else:
            accepted_by = -1
            accepted_by_username = -1
        if not event.rejected_by == -1:
            rejected_by = User.objects.get(id=event.rejected_by).account.nickname
            rejected_by_username = User.objects.get(id=event.rejected_by).username
        else:
            rejected_by = -1
            rejected_by_username = -1
        return Response({
            'id': event.id,
            'title': event.title,
            'author': event.author.account.nickname,
            'author_username': event.author.username,
            'thumbnail': event.thumbnail.url,
            'thumb_color': event.thumb_color,

            'accepted': event.accepted,
            'accepted_by': accepted_by,
            'accepted_by_username': accepted_by_username,
            'accept_date': event.accept_date,

            'rejected': event.rejected,
            'rejected_by': rejected_by,
            'rejected_by_username': rejected_by_username,
            'reject_date': event.reject_date,

            'event_date': event.event_date,
            'publish_date': event.publish_date,
            'rating': event.rating,
            'pos_votes': event_pos_votes,
            'neg_votes': event_neg_votes,

            'datas': data
        })
    except ObjectDoesNotExist:
        return Response({'error': 'Something not found!'})

@api_view(['GET'])
def GetEventIds(request):
    events = Event.objects.filter(accepted=True).values_list('id')
    res = []
    for i in events:
        res.append(i[0])
    return Response(res)

@api_view(['GET'])
def GetTopSubmission(request):
    events = Event.objects.filter(accepted=False, rejected=False).order_by('-rating').values('id', 'title', 'event_type', 'author', 'thumbnail', 'thumb_color', 'event_date', 'publish_date', 'rating')
    events_rating = []
    for i in events:
        author = User.objects.get(id=i['author'])
        event = Event.objects.get(id=i['id'])
        positive_votes = EventVote.objects.filter(event=event, vote_type=True).count()
        negative_votes = EventVote.objects.filter(event=event, vote_type=False).count()
        events_rating.append({
            'id': i['id'],
            'title': i['title'],
            'type': i['event_type'],
            'author': author.username,
            'thumbnail': i['thumbnail'],
            'thumb_color': i['thumb_color'],
            'event_date': i['event_date'],
            'publish_date': i['publish_date'],
            'rating': i['rating'],
            'positive_votes': positive_votes,
            'negative_votes': negative_votes
        })
    return Response(events_rating[:12])

@api_view(['GET'])
def GetLastAcceptedSubmissions(request):
    events = Event.objects.filter(accepted=True).order_by('-accept_date').values('id', 'title', 'event_type', 'author', 'thumbnail', 'thumb_color', 'event_date', 'rating')[:6]
    res = []
    for i in events:
        user = User.objects.get(id=i['author'])
        res.append({
            'id': i['id'],
            'title': i['title'],
            'event_type': i['event_type'],
            'author': user.username,
            'rating': i['rating'],
            'thumbnail': i['thumbnail'],
            'thumb_color': i['thumb_color'],
            'event_date': i['event_date']
        })
    return Response(res)

@api_view(['POST'])
def GetYourVote(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    token = data['auth_token']
    id = data['auth_id']
    event_id = data['event_id']

    try:
        user = User.objects.get(pk=id)
        jwt.decode(token, str(user.account.jwt_secret), algorithms=['HS256'])

        event = Event.objects.get(id=event_id)
        vote = EventVote.objects.filter(user=user, event=event).values('vote_type')
        res = ''
        if len(vote) > 0:
            if vote[0]['vote_type']:
                res = 'yes'
            else:
                res = 'no'
            return Response(res)
        else:
            return Response('No vote')

    except ObjectDoesNotExist:
        return Response({'error': 'Object does not exist!'})
    except jwt.ExpiredSignatureError:
        return Response({'error': 'token is expired!'})
    except jwt.exceptions.DecodeError:
        return Response({'error': 'token is invalid!'})

@api_view(['POST'])
def SetYourVote(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    token = data['auth_token']
    id = data['auth_id']
    event_id = data['event_id']
    vote_type = data['vote_type']

    try:
        user = User.objects.get(pk=id)
        jwt.decode(token, str(user.account.jwt_secret), algorithms=['HS256'])
        if not user.account.is_banned:
            if user.account.email_is_confirmed:
                event = Event.objects.get(id=event_id)

                if vote_type == 'yes':
                    if EventVote.objects.filter(user=user, event=event).exists():
                        cur_vote = EventVote.objects.get(user=user, event=event)
                        if  not cur_vote.vote_type:
                            event.rating = event.rating + 2
                            event.save()
                            cur_vote.vote_type = True
                            cur_vote.save()
                            return Response('yes')
                        else:
                            event.rating = event.rating - 1
                            event.save()
                            cur_vote.delete()
                            return Response('No vote')
                    else:
                        event.rating = event.rating + 1
                        event.save()
                        EventVote.objects.create(user=user, event=event, vote_type=True)
                        return Response('yes')
                else:
                    if EventVote.objects.filter(user=user, event=event).exists():
                        cur_vote = EventVote.objects.get(user=user, event=event)
                        if cur_vote.vote_type:
                            event.rating = event.rating - 2
                            event.save()
                            cur_vote.vote_type = False
                            cur_vote.save()
                            return Response('no')
                        else:
                            event.rating = event.rating + 1
                            event.save()
                            cur_vote.delete()
                            return Response('No vote')
                    else:
                        event.rating = event.rating - 1
                        event.save()
                        EventVote.objects.create(user=user, event=event, vote_type=False)
                        return Response('no')
            else:
                return Response({'error': 'Confirm your email address!'})
        else:
            return Response({'error': 'You are banned!'})

    except ObjectDoesNotExist:
        return Response({'error': 'Object does not exist!'})
    except jwt.ExpiredSignatureError:
        return Response({'error': 'token is expired!'})
    except jwt.exceptions.DecodeError:
        return Response({'error': 'token is invalid!'})

@api_view(['POST'])
def SearchEvents(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    only_year = data['only_year']
    year = data['year']
    month = data['month']
    page = data['page']
    order_rating = data['order_rating']

    items_per_page = 20

    page_limit = items_per_page * int(page)
    page_offset = page_limit - items_per_page

    res = []
    pages_count = 0
    events = []

    if not only_year or not year or not month or not page or not order_rating:
        return Response({'error'})
    else:

        if only_year == 'yes':
            if order_rating == 'up':
                events = Event.objects.filter(accepted=True, event_date__year=year).order_by('rating', 'event_date').values('id', 'title', 'event_type', 'author', 'thumbnail', 'thumb_color', 'event_date', 'rating')
            elif order_rating == 'down':
                events = Event.objects.filter(accepted=True, event_date__year=year).order_by('-rating', 'event_date').values('id', 'title', 'event_type', 'author', 'thumbnail', 'thumb_color', 'event_date', 'rating')
            else:
                events = Event.objects.filter(accepted=True, event_date__year=year).order_by('event_date').values('id', 'title', 'event_type', 'author', 'thumbnail', 'thumb_color', 'event_date', 'rating')

        elif only_year == 'no':
            if order_rating == 'up':
                events = Event.objects.filter(accepted=True, event_date__year=year, event_date__month=month).order_by('rating', 'event_date').values('id', 'title', 'event_type', 'author', 'thumbnail', 'thumb_color', 'event_date', 'rating')
            elif order_rating == 'down':
                events = Event.objects.filter(accepted=True, event_date__year=year, event_date__month=month).order_by('-rating', 'event_date').values('id', 'title', 'event_type', 'author', 'thumbnail', 'thumb_color', 'event_date', 'rating')
            else:
                events = Event.objects.filter(accepted=True, event_date__year=year, event_date__month=month).order_by('event_date').values('id', 'title', 'event_type', 'author', 'thumbnail', 'thumb_color', 'event_date', 'rating')

        for i in events[int(page_offset):int(page_limit)]:
            user = User.objects.get(id=i['author'])
            res.append({
                'id': i['id'],
                'title': i['title'],
                'event_type': i['event_type'],
                'author': user.username,
                'thumbnail': i['thumbnail'],
                'thumb_color': i['thumb_color'],
                'event_date': i['event_date'],
                'rating': i['rating']
            })
        pages_count = len(events[int(page_offset):int(page_limit)]) / items_per_page
        return Response({
            'events': res,
            'pages_count': pages_count,
            'total': len(events)
        })

@api_view(['GET'])
def GetAvailableYears(request):
    events = Event.objects.filter(accepted=True).values_list('event_date')
    res = []
    for i in events:
        res.append(i[0].year)
    return Response(sorted(set(res)))

@api_view(['POST'])
def SearchSubmissions(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    order_rating = data['order_rating']
    page = data['page']

    items_per_page = 20

    page_limit = items_per_page * int(page)
    page_offset = page_limit - items_per_page

    res = []
    pages_count = 0
    submissions = []

    if not order_rating:
        return Response({'error'})
    else:
        if order_rating == 'up':
            submissions = Event.objects.filter(accepted=False, rejected=False).order_by('rating').values('id', 'title', 'event_type', 'author', 'thumbnail', 'thumb_color', 'event_date', 'rating')
            for i in submissions[int(page_offset):int(page_limit)]:
                user = User.objects.get(id=i['author'])
                res.append({
                    'id': i['id'],
                    'title': i['title'],
                    'event_type': i['event_type'],
                    'author': user.username,
                    'thumbnail': i['thumbnail'],
                    'thumb_color': i['thumb_color'],
                    'event_date': i['event_date'],
                    'rating': i['rating']
                })
        elif order_rating == 'down':
            submissions = Event.objects.filter(accepted=False, rejected=False).order_by('-rating').values('id', 'title', 'event_type', 'author', 'thumbnail', 'thumb_color', 'event_date', 'rating')
            for i in submissions[int(page_offset):int(page_limit)]:
                user = User.objects.get(id=i['author'])
                res.append({
                    'id': i['id'],
                    'title': i['title'],
                    'event_type': i['event_type'],
                    'author': user.username,
                    'thumbnail': i['thumbnail'],
                    'thumb_color': i['thumb_color'],
                    'event_date': i['event_date'],
                    'rating': i['rating']
                })
        elif order_rating == 'no':
            submissions = Event.objects.filter(accepted=False, rejected=False).values('id', 'title', 'event_type', 'author', 'thumbnail', 'thumb_color', 'event_date', 'rating')
            for i in submissions[int(page_offset):int(page_limit)]:
                user = User.objects.get(id=i['author'])
                res.append({
                    'id': i['id'],
                    'title': i['title'],
                    'event_type': i['event_type'],
                    'author': user.username,
                    'thumbnail': i['thumbnail'],
                    'thumb_color': i['thumb_color'],
                    'event_date': i['event_date'],
                    'rating': i['rating']
                })
        pages_count = len(submissions[int(page_offset):int(page_limit)]) / items_per_page

    return Response({
        'submissions': res,
        'pages_count': pages_count,
        'total': len(submissions)
    })

@api_view(['POST'])
def Submit(request):
    thumbnail = request.FILES['thumbnail']
    data = json.loads(request.data['data'].read())
    token = request.data['token']
    id = request.data['id']

    error_arr = []
    try:
        user = User.objects.get(pk=id)
        jwt.decode(token, str(user.account.jwt_secret), algorithms=['HS256'])

        if data['title'] == '' or len(data['title']) > 100:
             error_arr.append('Event title error.')
        if len(data['data']) == 0:
             error_arr.append("Event data error.")
        if (not thumbnail) or (not 'image/' in thumbnail.content_type) or (thumbnail.content_type == 'image/gif') or (thumbnail.content_type == 'image/tiff'):
             error_arr.append('You only can use .svg, .png ang .jpg files as a thumbnail.')
        if not data['type'] or not (data['type'] == 'MEM' or data['type'] == 'WOR' or data['type'] == 'SPT' or data['type'] == 'ART' or data['type'] == 'MUS' or data['type'] == 'SCI' or data['type'] == 'GAM' or data['type'] == 'MDA'):
             error_arr.append('Event type error.')
        if not data['date'] or int(data['date'].split('-')[0]) > 2019 or int(data['date'].split('-')[0]) < 1900:
             error_arr.append("You can't submit events earlier than 1900 or later 2019.")
        if not data['color']:
             error_arr.append('Thumbnail color error.')
        if not user.account.email_is_confirmed:
            error_arr.append('You need to confirm your email address!')
        if user.account.is_banned:
            error_arr.append('You are banned!')

        if len(error_arr) == 0:
            new_event = Event.objects.create(author=user, title=data['title'], thumbnail=thumbnail, thumb_color=data['color'], event_type=data['type'], event_date=data['date'])
            for item in data['data']:
                EventData.objects.create(event=new_event, data_type=item['type'], data=item['data'])
            return Response(new_event.id)
        else:
            return Response({'error': error_arr})

    except ObjectDoesNotExist:
        return Response({'error': 'Object does not exist!'})
    except jwt.ExpiredSignatureError:
        return Response({'error': 'token is expired!'})
    except jwt.exceptions.DecodeError:
        return Response({'error': 'token is invalid!'})

@api_view(['POST'])
def AcceptSubmission(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    token = data['auth_token']
    id = data['auth_id']
    event_id = data['event_id']

    try:
        user = User.objects.get(pk=id)
        jwt.decode(token, str(user.account.jwt_secret), algorithms=['HS256'])
        event = Event.objects.get(pk=event_id)

        if not user.account.is_banned:
            if event.accepted or event.rejected:
                if user.account.staff_level >= 2:
                    event.accepted = True
                    event.accepted_by = user.pk
                    event.accept_date = timezone.now()
                    event.rejected = False
                    event.save()
                    return Response('Success')
                else:
                    return Response({'error': 'You can not do this!'})
            else:
                if user.account.staff_level >= 1:
                    event.accepted = True
                    event.accepted_by = user.pk
                    event.accept_date = timezone.now()
                    event.rejected = False
                    event.save()
                    return Response('Success')
                else:
                    return Response({'error': 'You can not do this!'})
        else:
            return Response({'error': 'You are banned!'})

    except ObjectDoesNotExist:
        return Response({'error': 'Object does not exist!'})
    except jwt.ExpiredSignatureError:
        return Response({'error': 'token is expired!'})
    except jwt.exceptions.DecodeError:
        return Response({'error': 'token is invalid!'})

@api_view(['POST'])
def RejectSubmission(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    token = data['auth_token']
    id = data['auth_id']
    event_id = data['event_id']

    try:
        user = User.objects.get(pk=id)
        jwt.decode(token, str(user.account.jwt_secret), algorithms=['HS256'])
        event = Event.objects.get(pk=event_id)

        if not user.account.is_banned:
            if event.accepted or event.rejected:
                if user.account.staff_level >= 2:
                    event.rejected = True
                    event.rejected_by = user.pk
                    event.reject_date = timezone.now()
                    event.accepted = False
                    event.save()
                    return Response('Success')
                else:
                    return Response({'error': 'You can not do this!'})
            else:
                if user.account.staff_level >= 1:
                    event.rejected = True
                    event.rejected_by = user.pk
                    event.reject_date = timezone.now()
                    event.accepted = False
                    event.save()
                    return Response('Success')
                else:
                    return Response({'error': 'You can not do this!'})
        else:
            return Response({'error': 'You are banned!'})

    except ObjectDoesNotExist:
        return Response({'error': 'Object does not exist!'})
    except jwt.ExpiredSignatureError:
        return Response({'error': 'token is expired!'})
    except jwt.exceptions.DecodeError:
        return Response({'error': 'token is invalid!'})
