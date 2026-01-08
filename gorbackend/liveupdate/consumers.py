import json
from channels.generic.websocket import AsyncWebsocketConsumer

class LiveScoreConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.match_id = self.scope['url_route']['kwargs']['match_id']
        self.group_name = f"score_match_{self.match_id}"

        # Join match score group
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Leave group
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    # Receive messages from server to send to WebSocket
    async def score_update(self, event):
        # event is a dict containing 'score'
        await self.send(text_data=json.dumps(event))

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.match_id = self.scope['url_route']['kwargs']['match_id']
        self.group_name = f"chat_match_{self.match_id}"

        # Join chat group
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data.get("message")

        # Broadcast message to group
        await self.channel_layer.group_send(
            self.group_name,
            {
                "type": "chat_message",
                "message": message
            }
        )

    # Receive message from group
    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            "message": event["message"]
        }))
