from django.urls import path
from .views import MessageList, UserRegistration, LoginView, MessageReplyView

urlpatterns = [
    path('messages/', MessageList.as_view()),
    path('messages/reply/<int:receiver_id>/', MessageReplyView.as_view(), name='message-reply'),
    path('register/', UserRegistration.as_view()),
    path('login/', LoginView.as_view()),
]
