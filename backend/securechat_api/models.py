from django.db import models

class User(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    company = models.CharField(max_length=100)
    socket_id = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.email

class Room(models.Model):
    room_id = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=100)
    members = models.ManyToManyField(User)
    created_at = models.DateTimeField(auto_now_add=True)

class Message(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=True)
