from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.decorators import api_view 
from backend.settings import EMAIL_HOST_USER
from django.core.mail import send_mail
from api.models import User,Sathi,Photo,Post,FoodPhoto,FoodProvider,Host

from api.serializers import UserSerialiser,SathiSerializer, PhotoSerializer,PostSerialiser,FoodProviderSerializer,FoodPhotoSerializer
# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerialiser
    

class SathiListView(ListAPIView):
    queryset = Sathi.objects.all()
    serializer_class = SathiSerializer

        
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
        foodslist.data[i]["image"]=photo.data
        print(i)
        i=i+1
        # else:
        #     return Response(photo.errors)
    # 
    # print(foodslist.data)
    # foods.data.append=photosdata
    return Response(foodslist.data)

    

    

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

