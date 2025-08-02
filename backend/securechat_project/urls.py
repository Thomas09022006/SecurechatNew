from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def welcome_view(request):
    return HttpResponse("Welcome to SecureChat API<br>This is the backend service for the SecureChat platform.")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('securechat_api.urls')),
    path('', welcome_view),  # root welcome page
]
