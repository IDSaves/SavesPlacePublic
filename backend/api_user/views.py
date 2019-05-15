from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.contenttypes.models import ContentType
from django.conf import settings
from django.http import HttpResponseRedirect
from django.contrib.auth import authenticate
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.core.exceptions import ObjectDoesNotExist
from django.core.mail import send_mail
from django.utils import timezone

from django.contrib.auth.models import User
from m_users.models import Account
from m_events.models import Event

from backend.api_funcs import *

import json, jwt, datetime, calendar, base64, os, uuid, binascii, random

@api_view(['GET'])
def GetUserData(request, username):
    try:
        user = User.objects.get(username=username)
        events = Event.objects.filter(author=user, accepted=True).values('id', 'title', 'event_type', 'author', 'thumbnail', 'thumb_color', 'event_date', 'publish_date', 'rating')
        pending_submissions = Event.objects.filter(author=user, accepted=False, rejected=False).values('id', 'title', 'event_type', 'author', 'thumbnail', 'thumb_color', 'event_date', 'publish_date', 'rating')
        rejected_submissions =  Event.objects.filter(author=user, rejected=True).values('id', 'title', 'event_type', 'author', 'thumbnail', 'thumb_color', 'event_date', 'publish_date', 'rating')

        return Response({
            "nickname": user.account.nickname,
            "username": user.username,
            "rating": user.account.rating,
            "avatar": user.account.avatar,
            "emoji": user.account.emoji,
            "status": user.account.status,
            "staff_level": user.account.staff_level,
            "events": events,
            "pending_submissions": pending_submissions,
            "rejected_submissions": rejected_submissions
        })

    except ObjectDoesNotExist:
        return Response({'error': 'Object does not exist!'})

@api_view(['POST'])
def CheckToken(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    id = data['id']
    token = data['token']

    try:
        user = User.objects.get(pk=id)
        jwt.decode(token, str(user.account.jwt_secret), algorithms=['HS256'])
        return Response({
            'valid': True,
            'nickname': user.account.nickname,
            'username': user.username,
            'avatar': user.account.avatar,
            'email': user.account.email,
            'email_is_confirmed': user.account.email_is_confirmed,
            'status': user.account.status,
            'staff_level': user.account.staff_level,
            'is_banned': user.account.is_banned
        })
    except ObjectDoesNotExist:
        return Response({'error': 'Object does not exist!'})
    except jwt.ExpiredSignatureError:
        return Response({'error': 'token is expired!'})
    except jwt.exceptions.DecodeError:
        return Response({'error': 'token is invalid!'})

@api_view(['POST'])
def SetEmoji(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    token = data['auth_token']
    id = data['auth_id']
    emoji = data['emoji']
    user_id = data['user_id']

    try:
        user = User.objects.get(pk=id)
        jwt.decode(token, str(user.account.jwt_secret), algorithms=['HS256'])
        if not user.account.is_banned:
            if user.account.staff_level >= 3:
                user_to_set = User.objects.get(pk=user_id)
                user_to_set.account.emoji = emoji
                user_to_set.account.save()
                return Response({'Success'})
            else:
                return Response({'error': "You don't have permissions to do this!"})
        else:
            return Response({'error': 'You are banned!'})

    except ObjectDoesNotExist:
        return Response({'error': 'Object does not exist!'})
    except jwt.ExpiredSignatureError:
        return Response({'error': 'token is expired!'})
    except jwt.exceptions.DecodeError:
        return Response({'error': 'token is invalid!'})


@api_view(['POST'])
def Registration(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    email = data['email']
    login = data['login']
    password = data['password']

    try:
        validate_email(email)
    except ValidationError:
        return Response({'error': 'Email is not valid!'})
    if not email or not login or not password:
        return Response({'error': 'Empty fields!'})
    elif len(login) < 4:
        return Response({'error': 'Your login length should be at least 4!'})
    elif len(login) > 15:
        return Response({'error': 'Your login length should not be more than 15!'})
    elif (' ' in login):
        return Response({'error': 'Your login should be a single word!'})
    elif len(password) < 6:
        return Response({'error': 'Your password length should be more than 6!'})
    elif len(password) > 25:
        return Response({'error': 'Your password length should not be more than 25!'})
    elif Account.objects.filter(email = email.capitalize(), email_is_confirmed = True):
        return Response({'error': 'User with such email is already exist!'})
    elif User.objects.filter(username = login).exists():
        return Response({'error': 'User with such login is already exist!'})
    else:
        new_user = User.objects.create_user(email = email.capitalize(), username = login, password = password)
        new_account = Account.objects.create(user = new_user, email = email.capitalize(), nickname = new_user.username, password_reset_code = 0, jwt_secret = random.random(), avatar = random.randint(1,17))
        future = datetime.datetime.utcnow() + datetime.timedelta(days = 7)
        payload = {
            "user_id": new_user.id,
            "user_avatar": new_account.avatar,
            "user_nickname": new_account.nickname,
            "exp": calendar.timegm(future.timetuple())
        }
        token = jwt.encode(payload, str(new_account.jwt_secret), algorithm = 'HS256').decode('utf-8')
        return Response({
            'id': new_user.id,
            'token': token
        })

@api_view(['POST'])
def Authentication(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    login_email = data['login_email']
    password = data['password']

    try:
        user_by_login = User.objects.get(username = login_email)
        if not user_by_login.check_password(password):
            user_by_login = None
    except ObjectDoesNotExist:
        user_by_login = None

    try:
        user_by_email = User.objects.get(email = login_email)
        if not user_by_email.check_password(password):
            user_by_email = None
    except ObjectDoesNotExist:
        user_by_email = None

    if user_by_login is not None:
        user = User.objects.get(username = login_email)
    elif user_by_email is not None:
        user = User.objects.get(email = login_email)
    else:
        return Response({'error': 'Invalid credentials!'})

    account = Account.objects.get(user = user)
    if not account.is_banned:
        future = datetime.datetime.utcnow() + datetime.timedelta(days = 1)
        payload = {
            "user_id": user.id,
            "user_avatar": account.avatar,
            "user_nickname": account.nickname,
            "exp": calendar.timegm(future.timetuple())
        }
        token = jwt.encode(payload, str(account.jwt_secret), algorithm = 'HS256').decode('utf-8')
        return Response({
            'id': user.id,
            'token': token
        })
    else:
        return Response({'error': 'You are banned!'})

@api_view(['POST'])
def Settings(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    token = data['auth_token']
    id = data['auth_id']
    nickname = data['nickname']
    status = data['status']
    email = data['email']
    avatar = data['avatar']

    error_arr = []

    try:
        user = User.objects.get(pk=id)
        jwt.decode(token, str(user.account.jwt_secret), algorithms=['HS256'])
        if not user.account.is_banned:
            if nickname and status and email and avatar:

                if not nickname == -1:
                    if len(nickname) < 4 or len(nickname) > 15:
                        error_arr.append('Your login length should at least 4 and should not be more than 15!')
                    else:
                        user.account.nickname = nickname

                if not status == -1:
                    if len(status) > 70:
                        error_arr.append('Your status should not be more than 70!')
                    else:
                        user.account.status = status

                if not email == -1:
                    try:
                        validate_email(email)
                        user.account.email = email
                    except ValidationError:
                        error_arr.append('Email is not valid!')

                if not avatar == -1:
                    user.account.avatar = avatar

                if len(error_arr) == 0:
                    future = datetime.datetime.utcnow() + datetime.timedelta(days = 1)
                    payload = {
                        "user_id": user.id,
                        "user_avatar": user.account.avatar,
                        "user_nickname": user.account.nickname,
                        "exp": calendar.timegm(future.timetuple())
                    }
                    token = jwt.encode(payload, str(user.account.jwt_secret), algorithm = 'HS256').decode('utf-8')
                    user.account.save()
                    return Response({'id': user.id, 'token': token})
                else:
                    return Response({'errors': error_arr})
            else:
                return Response({'error': 'Not enough variables!'})
        else:
            return Response({'error': 'You are banned!'})
    except ObjectDoesNotExist:
        return Response({'error': 'Object does not exist!'})
    except jwt.ExpiredSignatureError:
        return Response({'error': 'token is expired!'})
    except jwt.exceptions.DecodeError:
        return Response({'error': 'token is invalid!'})


@api_view(['POST'])
def ChangePassword(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    token = data['auth_token']
    id = data['auth_id']
    cur_passw = data['cur_passw']
    passw = data['passw']

    try:
        user = User.objects.get(pk=id)
        jwt.decode(token, str(user.account.jwt_secret), algorithms=['HS256'])
        if not user.account.is_banned:
            if cur_passw and passw:
                pas_check = user.check_password(cur_passw)
                if pas_check:
                    if len(passw) < 6 or len(passw) > 25:
                        return Response({'error': 'Your password showld be more than 6 and less than 25!'})
                    else:
                        user.set_password(passw)
                        user.save()
                        return Response({'You have successfully changed your password!'})
                else:
                    return Response({'error': 'Current password is invalid!'})
            else:
                return Response({'error': 'Not enough variables!'})
        else:
            return Response({'error': 'You are banned!'})
    except ObjectDoesNotExist:
        return Response({'error': 'Object does not exist!'})
    except jwt.ExpiredSignatureError:
        return Response({'error': 'token is expired!'})
    except jwt.exceptions.DecodeError:
        return Response({'error': 'token is invalid!'})

@api_view(['POST'])
def SendEmailConfirmation(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    token = data['auth_token']
    id = data['auth_id']

    try:
        user = User.objects.get(pk=id)
        jwt.decode(token, str(user.account.jwt_secret), algorithms=['HS256'])
        if not user.account.is_banned:
            if not user.account.email_is_confirmed:
                user.account.email_confirm_code = email_code_generator(4)
                user.account.save()

                email_confirm_code = user.account.email_confirm_code
                user_email = user.account.email
                message = 'Hello! This is your confirmation code: ' + str(email_confirm_code) + ' !'
                send_mail(
                    'SavesPlace email confirmation!',
                    message,
                    settings.EMAIL_HOST_USER,
                    [user_email],
                    fail_silently=False,
                )
                return Response('Email has been sent!')
            else:
                return Response({'error': 'Email is already confirmed!'})
        else:
            return Response({'error': 'You are banned!'})
    except UnicodeDecodeError:
        return Response({'error': 'Can not decode token!'})
    except binascii.Error:
        return Response({'error': 'Can not decode token!'})
    except ObjectDoesNotExist:
        return Response({'error': 'Object does not exist!'})
    except jwt.ExpiredSignatureError:
        return Response({'error': 'token is expired!'})
    except jwt.exceptions.DecodeError:
        return Response({'error': 'token is invalid!'})

@api_view(['POST'])
def EmailConfirmation(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    token = data['auth_token']
    id = data['auth_id']
    code = data['code']

    try:
        user = User.objects.get(pk=id)
        jwt.decode(token, str(user.account.jwt_secret), algorithms=['HS256'])
        if not user.account.is_banned:
            if not user.account.email_is_confirmed:
                if code == user.account.email_confirm_code and not code == 1:
                    user.account.email_confirm_code = 1
                    user.account.email_is_confirmed = True
                    user.account.save()
                    return Response("You have successfully confirmed your email address!")
                else:
                    return Response({'error': 'Confirmation code is invalid!'})
            else:
                return Response({'error': 'Email is already confirmed!'})
        else:
            return Response({'error': 'You are banned!'})

    except UnicodeDecodeError:
        return Response({'error': 'Can not decode token!'})
    except binascii.Error:
        return Response({'error': 'Can not decode token!'})
    except ObjectDoesNotExist:
        return Response({'error': 'Object does not exist!'})
    except jwt.ExpiredSignatureError:
        return Response({'error': 'token is expired!'})
    except jwt.exceptions.DecodeError:
        return Response({'error': 'token is invalid!'})

@api_view(['POST'])
def SendPasswordResetCode(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    email = data['email']

    try:
        user = Account.objects.get(email=email.capitalize(), email_is_confirmed=True)
        user.password_reset_code = uuid.uuid4().hex
        user.save()

        user_id = str(user.user.pk)
        password_reset_code = str(user.password_reset_code)
        user_email = user.email
        user_username = str(user.user.username)
        message = 'Hello! This is SavesPlace password resetting message! Your login is: ' + user_username + ' Click on this link to reset your password: http://localhost:3000/password_reset_confirm?u=' + user_id + '&code=' + password_reset_code
        send_mail(
            'SavesPlace password reset!',
            message,
            settings.EMAIL_HOST_USER,
            [user_email],
            fail_silently=False,
        )
        return Response('Email has been sent!')
    except ObjectDoesNotExist:
        return Response({'error': 'User with such email is not found!'})


@api_view(['POST'])
def ResetPassword(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    user_id = data['u']
    user_password_code = data['password_code']
    new_password = data['new_password']

    try:
        user = User.objects.get(pk=user_id)
        if not user.account.password_reset_code == 1:
            if user.account.password_reset_code == user_password_code:
                if len(new_password) < 6 or len(new_password) > 25:
                    return Response({'error': "Your password showld be more than 6 and less than 25!"})
                else:
                    user.set_password(new_password)
                    user.save()

                    user.account.password_reset_code = 1
                    user.account.save()
                    return Response('You have successfully changed your password!')
            else:
                return Response({'error': "Your code is invalid!"})
        else:
            return Response({'error': "You don't have a password reset code!"})
    except ObjectDoesNotExist:
        return Response({'error': 'User is not found!'})
