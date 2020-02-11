from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view ,renderer_classes
from backend.settings import EMAIL_HOST_USER
from django.core.mail import send_mail
from api.models import User,Sathi,Photo,Post,FoodPhoto,FoodProvider,Host, Event, EventImages, BookingData

from api.serializers import UserSerialiser,SathiSerializer, PhotoSerializer,PostSerialiser,FoodProviderSerializer,FoodPhotoSerializer
from api.serializers import EventSerializer, EventImagesSerializer, BookingDataSerializer

from simple_search import search_filter

from geopy.distance import geodesic
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
def HelloMan(request):
    # queryset = Sathi.objects.all()
    # serializer_class = SathiSerializer
    
    slat = request.GET['lat']
    slon = request.GET['lon']
    # print(type(slat))
    # lat = float(slat)
    # lon = float(slon)
    # print(type(lat))
    stravelLimit = request.GET['limit']
    travelLimit = float(stravelLimit)
    key = request.GET['key']
    #checkpint is an array of lat and lon where both are in float---> make get['lat'] and get['lon'] as floats
    checkpoint = [0.00, 0.00]
    #duratio is a floating point thing and get something from ahead
    travelDuration = 3
    
    search_fields = ['location']
    f = search_filter(search_fields, key)
    if (key != "null"):
        satheeskey = Sathi.objects.filter(f)
        foodskey = FoodProvider.objects.filter(f)
        eventskey = Event.objects.filter(f)
    else:
        satheeskey = Sathi.objects.all()
        foodskey = FoodProvider.objects.all()
        eventskey = Event.objects.all()

    pk_sathees = []
    pk_foods = []
    pk_events = []

    if (travelLimit != "null"):
        for i in range(len(satheeskey)):
            calculations = geodesic(checkpoint,[satheeskey[i].lat,satheeskey[i].lon]).km
            if calculations<travelLimit:
                pk_sathees.append(satheeskey[i].id)

        for i in range(len(foodskey)):
            calculations = geodesic(checkpoint,[foodskey[i].lat,foodskey[i].lon]).km
            if calculations<travelLimit:
                pk_foods.append(foodskey[i].id)

        for i in range(len(eventskey)):
            calculations = geodesic(checkpoint,[eventskey[i].lat,eventskey[i].lon]).km
            if calculations<travelLimit:
                pk_events.append(eventskey[i].id)
            
        sathees1 = Sathi.objects.filter(pk__in= pk_sathees)
        foods1 = FoodProvider.objects.filter(pk__in = pk_foods)
        events1 = Event.objects.filter(pk__in = pk_events)

    
    if (travelDuration != "null"):
        for i in range(len(satheeskey)):
            calculations = geodesic(checkpoint,[satheeskey[i].lat,satheeskey[i].lon]).km
            if calculations<travelLimit:
                pk_sathees.append(satheeskey[i].id)

        for i in range(len(foodskey)):
            calculations = geodesic(checkpoint,[foodskey[i].lat,foodskey[i].lon]).km
            if calculations<travelLimit:
                pk_foods.append(foodskey[i].id)

        for i in range(len(eventskey)):
            calculations = geodesic(checkpoint,[eventskey[i].lat,eventskey[i].lon]).km
            if calculations<travelLimit:
                pk_events.append(eventskey[i].id)
            
        sathees2 = Sathi.objects.filter(pk__in= pk_sathees)
        foods2 = FoodProvider.objects.filter(pk__in = pk_foods)
        events2 = Event.objects.filter(pk__in = pk_events)

        if (travelLimit != "null"):
            sathees = sathees1.intersection(sathees2)
            foods = foods1.intersection(foods2)
            events = events1.intersection(events2)

        else:
            sathees = sathees2   
            foods = foods2
            events = events2

    if (travelDuration == "null"):
        sathees = sathees1
        foods = foods1
        events = events1

    if (travelDuration == "null" and travelLimit == "null"):
        sathees = satheeskey
        foods = foodskey
        events = eventskey

    satheeslist=SathiSerializer(sathees,many=True)
    foodslist=FoodProviderSerializer(foods,many=True)
    eventslist=EventSerializer(events,many=True)

    if (len(satheeslist.data) or len(foodslist.data) or len(eventslist.data)) ==0:
        return Response({"msg":"Unable to get data from database"})
    i=0
    for sathi in sathees:
        photos = Photo.objects.filter(sathi=sathi)
        photo = PhotoSerializer(photos,many=True)
        data =[]
        for p in photo.data:
            data.append(p["image"])
        satheeslist.data[i]["image"]=data
        i=i+1
    
    i=0
    for food in foods:
        photos = FoodPhoto.objects.filter(food=food)
        photo = FoodPhotoSerializer(photos,many=True)
        data =[]
        for p in photo.data:
            data.append(p["image"])
        foodslist.data[i]["image"]=data
        i=i+1

    i=0
    for event in events:
        photos = EventImages.objects.filter(event=event)
        photo = EventImagesSerializer(photos,many=True)
        data =[]
        for p in photo.data:
            data.append(p["image"])
        eventslist.data[i]["image"]=data
        i=i+1
    
    netData = {
        'sathi' : satheeslist.data,
        'food'  : foodslist.data,
        'event' : eventslist.data
    }

    return Response(netData)

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
# @renderer_classes(Response)
def SathiView(request,pk):
    sathi = Sathi.objects.get(id=pk)
    photos = Photo.objects.filter(sathi=sathi)
    photo = PhotoSerializer(photos,many=True)
    data =[]
    ph=[]
    for p in photo.data:
        data.append(p["image"])
    sathilist = SathiSerializer(sathi)
    lists=[sathilist.data]
    lists[0]["image"]=data
    return Response(lists)


@api_view(['GET',])
def FoodView(request,pk):
    food = FoodProvider.objects.get(id=pk)
    photos = FoodPhoto.objects.filter(food=food)
    photo = FoodPhotoSerializer(photos,many=True)
    data =[]
    for p in photo.data:
        data.append(p["image"])
    foodlist = FoodProviderSerializer(food)
    lists=[foodlist.data]
    lists[0]["image"]=data
    return Response(lists)

@api_view(['GET',])
def EventView(request,pk):
    event = Event.objects.get(id=pk)
    photos = EventImages.objects.filter(event=event)
    photo = EventImagesSerializer(photos,many=True)
    data =[]
    for p in photo.data:
        data.append(p["image"])
    eventlist = EventSerializer(event)
    lists=[eventlist.data]
    lists[0]["image"]=data
    return Response(lists)

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


