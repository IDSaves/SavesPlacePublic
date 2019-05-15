from django.urls import path

from . import views

urlpatterns = [
    path('get/', views.GetStats),
    path('get_top_users/', views.GetTopUsers),

    path('count_event_types/', views.CountEventTypes),
    path('cout_events_last_6_months/', views.CountEventsLast6Months)
]
