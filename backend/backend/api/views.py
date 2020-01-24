from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.decorators import api_view 
from backend.settings import EMAIL_HOST_USER
from django.core.mail import send_mail
from api.models import User,Sathi,Photo,Post,FoodPhoto,FoodProvider,Host, Event, EventImages, BookingData

from api.serializers import UserSerialiser,SathiSerializer, PhotoSerializer,PostSerialiser,FoodProviderSerializer,FoodPhotoSerializer
from api.serializers import EventSerializer, EventImagesSerializer, BookingDataSerializer
# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerialiser
    
@api_view(['GET',])
def SathiListView(request):
    # queryset = Sathi.objects.all()
    # serializer_class = SathiSerializer
    sathis = Sathi.objects.all()
    # print(foods[0])
    sathislist=SathiSerializer(sathis,many=True)
    if len(sathislist.data)==0:
        return Response({"msg":"Unable to get data from database"})
    i=0
    for sathi in sathis:
        photos = Photo.objects.filter(sathi=sathi)
        photo = PhotoSerializer(photos,many=True)
        data =[]
        for p in photo.data:
            data.append(p["image"])
        sathislist.data[i]["image"]=data
        i=i+1
    return Response(sathislist.data)


@api_view(['GET',])
def EventListView(request):
    events = Event.objects.all()
    eventslist=EventSerializer(events,many=True)
    if len(eventslist.data)==0:
        return Response({"msg":"Unable to get data from database"})
    i=0
    for event in events:
        photos = EventImages.objects.filter(event=event)
        photo = EventImagesSerializer(photos,many=True)
        data =[]
        for p in photo.data:
            data.append(p["image"])
        eventslist.data[i]["image"]=data
        i=i+1
    return Response(eventslist.data)

        
@api_view(['GET',])
def FoodProviderView(request):
    foods = FoodProvider.objects.all()
    # print(foods[0])
    foodslist=FoodProviderSerializer(foods,many=True)
    if len(foodslist.data)==0:
        return Response({"msg":"Unable to get data from database"})
    i=0
    for food in foods:
        photos = FoodPhoto.objects.filter(food=food)
        photo = FoodPhotoSerializer(photos,many=True)
        data =[]
        for p in photo.data:
            data.append(p["image"])
        foodslist.data[i]["image"]=data
        i=i+1
    return Response(foodslist.data)
  

@api_view(['GET',])
def SathiView(request,pk):
    sathi = Sathi.objects.get(id=pk)
    photos = Photo.objects.filter(sathi=sathi)
    photo = PhotoSerializer(photos)
    data =[]
    for p in photo.data:
        data.append(p["image"])
    sathilist = SathiSerializer(sathi)
    print(photo)
    sathilist.data["image"]=data
    return Response(sathilist.data)

@api_view(['GET',])
def PhotoShow(request,pk):
    sathi = Sathi.objects.get(id=pk)
    reqphoto = Photo.objects.filter(sathi=sathi)
    photos= PhotoSerializer(reqphoto,many=True)
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

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerialiser

@api_view(['POST',])
def BookData(request):
    book=BookingData(fname=request.data["fname"], lname=request.data["lname"], docType = request.data["docType"], docID=request.data["docID"], phone=request.data["phone"])
    book.save()
    return Response("Success")

@api_view(['POST',])
def SendMail(request):
    hos=Host(name=request.data["name"],email=request.data["mailto"],phone=request.data["phone"],category=request.data["category"])
    hos.save()
    name=request.data["name"]
    receipent=request.data["mailto"]
    category = request.data["category"]
    print(receipent)
    subject="Thanks for application"
    message = f"Dear, {name} Thank you for applying for {category}. We will get to you soon."
    # send_mail(subject,message,EMAIL_HOST_USER,[receipent],fail_silently=False)
    msg=f"Mail sent to {name}"
    return Response({"msg":msg})

def newUser(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # print(data)
        usr = User(first_name=data['name'])
        usr.save()
    return HttpResponse("added the name " + usr.name)


