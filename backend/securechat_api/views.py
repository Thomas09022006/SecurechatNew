from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Room, Message
from .serializers import UserSerializer, RoomSerializer, MessageSerializer
import uuid, random, base64

@api_view(['POST'])
def signup(request):
    data = request.data
    if User.objects.filter(email=data['email']).exists():
        return Response({'error': 'User already exists'}, status=400)
    socket_id = str(uuid.uuid4())
    user = User.objects.create(
        email=data['email'],
        password=data['password'],
        company=data['company'],
        socket_id=socket_id
    )
    return Response(UserSerializer(user).data)

@api_view(['POST'])
def login(request):
    data = request.data
    try:
        user = User.objects.get(email=data['email'], password=data['password'])
        return Response(UserSerializer(user).data)
    except User.DoesNotExist:
        return Response({'error': 'Invalid credentials'}, status=401)

@api_view(['POST'])
def create_room(request):
    data = request.data
    room_id = str(random.randint(1000000000, 9999999999))
    password = base64.b64encode(uuid.uuid4().bytes).decode('utf-8')[:10]

    try:
        user = User.objects.get(email=data['email'])
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)

    try:
        partner = User.objects.get(email=data['partner_email'])
    except User.DoesNotExist:
        return Response({'error': 'Partner not found'}, status=404)

    room = Room.objects.create(room_id=room_id, password=password)
    room.members.add(user, partner)

    return Response({'room_id': room.room_id, 'password': room.password})

@api_view(['POST'])
def join_room(request):
    data = request.data
    try:
        room = Room.objects.get(room_id=data['room_id'], password=data['password'])
        user = User.objects.get(email=data['email'])
        room.members.add(user)

        # ✅ Return room_id and password to frontend
        return Response({
            'room_id': room.room_id,
            'password': room.password
        })
    except:
        return Response({'error': 'Invalid room or credentials'}, status=400)

@api_view(['POST'])
def send_message(request):
    data = request.data
    try:
        sender = User.objects.get(email=data['sender_email'])
        room = Room.objects.get(room_id=data['room_id'])
        is_verified = data['sender_socket_id'] == sender.socket_id
        message = Message.objects.create(
            room=room,
            sender=sender,
            text=data['text'],
            is_verified=is_verified
        )
        return Response(MessageSerializer(message).data)
    except Exception as e:
        return Response({'error': str(e)}, status=400)

@api_view(['GET'])
def get_messages(request, room_id):
    try:
        room = Room.objects.get(room_id=room_id)
        messages = Message.objects.filter(room=room).order_by('timestamp')
        return Response(MessageSerializer(messages, many=True).data)
    except Room.DoesNotExist:
        return Response({'error': 'Room not found'}, status=404)
