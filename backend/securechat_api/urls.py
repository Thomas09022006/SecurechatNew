from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup),
    path('login/', views.login),
    path('create-room/', views.create_room),
    path('join-room/', views.join_room),
    path('send-message/', views.send_message),
    path('get-messages/<str:room_id>/', views.get_messages),
]
