from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import  Response
from django.http import HttpResponse

from api.models import User

from api.serializers import UserSerialiser

# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerialiser
    




def newUser(request):
    if request.method == 'POST':
        print('Post request')
    # usr = User(first_name=)
    # usr.save()
    print(request.method)
    return HttpResponse("added the name Manish")


