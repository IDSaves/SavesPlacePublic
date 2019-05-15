from django.contrib import admin
from .models import *

class m_users(admin.ModelAdmin):
    list_display = ('id', 'user', 'nickname', 'verified', 'email', 'email_is_confirmed', 'status', 'staff_level', 'is_banned', 'reg_date')
admin.site.register(Account, m_users)
