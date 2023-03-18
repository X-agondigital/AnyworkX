from django.contrib.auth.models import User
from django.http import Http404
from rest_framework import generics, permissions, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from . import serializers
from .models import Message
from .serializers import MessageSerializer, UserSerializer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


class UserRegistration(generics.CreateAPIView):
    serializer_class = UserSerializer


class LoginView(generics.GenericAPIView):
    serializer_class = serializers.LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_200_OK)


class MessageList(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        try:
            admin_user = User.objects.get(username='admin')
        except User.DoesNotExist:
            # Handle the case where the admin user does not exist
            raise Http404("Admin user does not exist")

        message = serializer.save(sender=self.request.user, recipient=admin_user)
        channel_layer = get_channel_layer()
        if channel_layer is not None:
            async_to_sync(channel_layer.group_send)(
                f'messages_{message.sender.username}_{message.recipient.username}',
                {
                    'type': 'send_message',
                    'message': message.message,
                }
            )
        else:
            # Handle the case where the channel layer is None
            raise Exception("Channel layer is None")

    def get_queryset(self):
        try:
            admin_user = User.objects.get(username='admin')
        except User.DoesNotExist:
            # Handle the case where the admin user does not exist
            raise Http404("Admin user does not exist")

        queryset = Message.objects.filter(sender=self.request.user, recipient=admin_user) \
            .union(Message.objects.filter(sender=admin_user, recipient=self.request.user)) \
            .order_by('timestamp')
        return queryset


class MessageReplyView(generics.CreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, receiver_id, *args, **kwargs):
        # Ensure the authenticated user is the admin user
        if request.user.username != 'admin':
            raise PermissionDenied("You do not have permission to send a message as an admin")

        # Retrieve the recipient using the provided id
        recipient = User.objects.get(pk=receiver_id)

        # Create the reply message with the recipient set to the requested user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        message = serializer.save(sender=request.user, recipient=recipient)

        # Send the message over the channel layer
        channel_layer = get_channel_layer()
        if channel_layer is not None:
            async_to_sync(channel_layer.group_send)(
                f'messages_{message.sender.username}_{message.recipient.username}',
                {
                    'type': 'send_message',
                    'message': message.message,
                }
            )
        else:
            # Handle the case where the channel layer is None
            raise Exception("Channel layer is None")

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)





