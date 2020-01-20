from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.generics import ListAPIView
from rest_framework.response import  Response
from django.http import HttpResponse

from api.models import User,Sathi,Photo

from api.serializers import UserSerialiser,SathiSerializer, PhotoSerializer
# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerialiser
    

class SathiListView(ListAPIView):
    queryset = Sathi.objects.all()
    print(queryset)
    serializer_class = SathiSerializer


class PhotoListView(ListAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer

def newUser(request):
    if request.method == 'POST':
        print('Post request')
    # usr = User(first_name=)
    # usr.save()
    print(request.method)
    return HttpResponse("added the name Manish")


