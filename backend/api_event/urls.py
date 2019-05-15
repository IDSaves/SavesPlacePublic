from django.urls import path

from . import views

urlpatterns = [
    path('submit/', views.Submit),
    path('get/<id>/', views.GetEvent),
    path('get_top_submissions/', views.GetTopSubmission),
    path('get_last_accepted_submissions/', views.GetLastAcceptedSubmissions),
    path('search_events/', views.SearchEvents),
    path('search_submissions/', views.SearchSubmissions),
    path('get_your_vote/', views.GetYourVote),
    path('set_your_vote/', views.SetYourVote),
    path('get_available_years/', views.GetAvailableYears),
    path('get_events_ids/', views.GetEventIds),

    path('accept_submission/', views.AcceptSubmission),
    path('reject_submission/', views.RejectSubmission)
]
