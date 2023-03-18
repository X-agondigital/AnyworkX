from django.urls import path
from . import views

urlpatterns = [
    path('create/job/list/', views.JobsListViews.as_view(), name='jobs_list'),
    path('job/details/<str:pk>/', views.JobsDetailViews.as_view(), name='jobs_details'),
    path('view/job/application/', views.ApplicantListViews.as_view(), name='jobs_list'),
    path('jobs/apply/<str:pk>/', views.ApplicationView.as_view(), name='apply-job'),
    path('view/application/details/<str:pk>/', views.ApplicantDetailViews.as_view(), name='applicant_details'),
    path('subcribe/', views.CreateSubscribersView.as_view(), name='subscribers'),
]
