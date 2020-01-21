from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import  Response
from django.http import HttpResponse
import json
from api.models import User, Post

from api.serializers import UserSerialiser, PostSerialiser

# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerialiser
    
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerialiser



def newUser(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # print(data)
        usr = User(first_name=data['name'])
        usr.save()
    return HttpResponse("added the name " + usr.name)


