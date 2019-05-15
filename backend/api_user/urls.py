from django.urls import path

from . import views

urlpatterns = [
    path('get/<username>/', views.GetUserData),
    path('register/', views.Registration),
    path('auth/', views.Authentication),

    path('check_token/', views.CheckToken),

    path('set_emoji/', views.SetEmoji),

    path('settings/', views.Settings),
    path('change_password/', views.ChangePassword),

    path('send_email_code/', views.SendEmailConfirmation),
    path('confirm_email/', views.EmailConfirmation),

    path('send_password_reset_code/', views.SendPasswordResetCode),
    path('reset_password/', views.ResetPassword)
]
