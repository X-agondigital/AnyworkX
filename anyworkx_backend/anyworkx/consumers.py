import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import User

from chat.models import Message


class MessageConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        self.sender = self.scope['user']
        self.recipient = User.objects.get(username='admin')
        self.room_name = f'messages_{self.sender.username}_{self.recipient.username}'
        self.room_group_name = f'messages_{self.sender.username}_{self.recipient.username}'
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        await self.save_message(message)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'send_message',
                'message': message,
            }
        )

    async def send_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))

    async def save_message(self, message):
        Message.objects.create(sender=self.sender, recipient=self.recipient, message=message)
