from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser



from api.models import User,Sathi,Photo

from api.serializers import UserSerialiser,SathiSerializer, PhotoSerializer
# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerialiser
    

class SathiListView(ListAPIView):
    queryset = Sathi.objects.all()
    serializer_class = SathiSerializer

@api_view(['GET',])
def PhotoShow(request,pk):
    sathi = Sathi.objects.get(id=pk)
    reqphoto = Photo.objects.get(sathi=sathi)
    photos= PhotoSerializer(reqphoto)
    print(photos.data)
    return Response(photos.data)

@api_view(['PUT',])
def SathiUpdater(request,pk):
    sathi = Sathi.objects.get(id=pk)
    data={}
    if sathi:
        sathi.available = request.data["available"]
        sathi.duration = request.data["duration"]
        sathi.save()
        data["success"]="updated"
        return Response(data=data)

    # updatedData = SathiSerializer(sathi)
    data["success"]="fail to update"
    return Response(data=data)




def newUser(request):
    if request.method == 'POST':
        print('Post request')
    # usr = User(first_name=)
    # usr.save()
    print(request.method)
    return HttpResponse("added the name Manish")


