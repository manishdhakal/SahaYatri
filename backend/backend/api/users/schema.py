from django.contrib.auth.models import User
import datetime
import json
from ..converter import BigInt
import graphene
from graphene_django import DjangoObjectType
from ..models import BookingData,Sathi,FoodProvider,Event,SathiTime,FoodTime,EventTime,Photo,FoodPhoto,EventImages
from ..schema import SathiType,FoodType,EventType,PhotoType,SathiTimeType,FoodPhotoType,FoodTimeType,EventPhotoType,EventTimeType
from graphene_file_upload.scalars import Upload
class UserType(DjangoObjectType):
    class Meta:
        model = User

class BookDataType(DjangoObjectType):
    class Meta:
        model = BookingData


# Booking data-------------------------->>>
class BookData(graphene.Mutation):
    book_data=graphene.Field(BookDataType)
    class Arguments:
        time_id=graphene.Int(required=True)
        category= graphene.Int(required=True)
        category_id= graphene.Int(required=True)
        # host =graphene.Argument(UserType)


    def mutate(self,info,time_id,category,category_id):
        user = info.context.user or None
        if user.is_anonymous:
            raise Exception("You must be logged in!!")
        
        if category==0:
            Cat=Sathi
            catTime=SathiTime

        elif category==1:
            Cat=FoodProvider
            catTime=FoodTime
        else:
            Cat=Event
            catTime=EventTime 
            
        cat=Cat.objects.get(id=category_id)
        host=cat.user
        bookData=BookingData(user=user,time=time_id,category=category,host=host)
        bookData.save()
        time=catTime.objects.get(id=time_id)
        if time.booked==True:
            raise Exception("already booked")
        else:
            time.booked==True
        time.save()
        return BookData(book_data=bookData)
        


# Query for bookings,users,and me
class Query(graphene.AbstractType):
    me = graphene.Field(UserType)
    users = graphene.List(UserType)
    bookings = graphene.String(cat=graphene.Int())

    def resolve_users(self, info):
        return User.objects.all().select_related('profile')

    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not logged in!')

        return user

    def resolve_bookings(self, info,cat):
        user=info.context.user
        print(info.context)
        if user.is_anonymous:
            raise Exception('Not logged in!')
        # return 'Holy Fuck'
        # print(user)
        if user.profile.host==True:
            try:
                bookings=BookingData.objects.all().filter(host=user,category=cat)
            except:
                return Exception("No bookings available")

        else:
            try:
                bookings=BookingData.objects.all().filter(user=user,category=cat)
            except:
                return Exception("No bookings available")
        
        print(bookings)
        bookData=[]
        if cat==0:
            CatTime=SathiTime
        elif cat==1:
            CatTime=FoodTime
        else:
            CatTime = EventTime
        # try:
        for booking in bookings:
            data={}
            time=CatTime.objects.get(id=booking.time)
            sathi=time.sathi
            hirer={"name":booking.user.first_name+booking.user.last_name,"phone":booking.user.profile.phone,"email":booking.user.email}
            data["sathi"]=sathi.name
            data["time"]=time.date.strftime("%Y-%m-%d")
            data["hirer"]=hirer
            # print(data)
            bookData.append(data)
        return bookData
        


class CreateSathi(graphene.Mutation):
    sathi=graphene.Field(SathiType)
    class Arguments:
        name = graphene.String(required=True)
        email = graphene.String(required=True)
        phone = graphene.Argument(BigInt)
        description = graphene.String(required=True)
        duration = graphene.String(required=True)
        languages = graphene.String(required=True)
        interests = graphene.String(required=True)
        location = graphene.String(required=True)
        lat = graphene.Float(required=True)
        lon = graphene.Float(required=True)
        price = graphene.Int(required=True)
        image = Upload(required=False)
    def mutate(self,info,**kwargs):
        user=info.context.user

        if user.is_anonymous:
            raise Exception("Login first")
        sathi=Sathi(
            user = user,
            name =  kwargs.get('name'),
            email = kwargs.get('email'),
            phone = kwargs.get('phone'),
            description =kwargs.get('description'),
            duration = kwargs.get('duration'),
            languages =kwargs.get('languages'),
            interests =kwargs.get('interests'),
            location = kwargs.get('location'),
            lat = kwargs.get('lat'),
            lon = kwargs.get('lon'),
            price =kwargs.get('price')
        )
        sathi.save()
        if kwargs.get('image') != None:
            photo=kwargs.get('image')
            image=Photo(sathi=sathi,image=photo)
            image.save()
        
        return CreateSathi(sathi=sathi)

class AddSathiImage(graphene.Mutation):
    image=graphene.Field(PhotoType)
    success=graphene.Boolean()
    class Arguments:
        sathi_id=graphene.Int(required=True)
        image=Upload(required=True)

    def mutate(self,info,sathi_id,image):
        user = info.context.user or None
        #if user.is_anonymous:
         #   raise Exception("not logged in")
	
        sathi=Sathi.objects.get(id=sathi_id)
        photo=Photo(sathi=sathi,image=image)
        photo.save()
        return AddSathiImage(success=True)

class PickSathiDate(graphene.Mutation):
    date=graphene.Field(SathiTimeType)
    success=graphene.Boolean()
    class Arguments:
        sathi_id=graphene.Int(required=True)
        date=graphene.String(required=True)
    def mutate(self,info,sathi_id,date):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("not logged in")
        sathi=Sathi.objects.get(id=sathi_id)
        date=datetime.datetime.strptime(date, "%Y-%m-%d").date()
        d=SathiTime(sathi=sathi,date=date)
        d.save()
        return PickSathiDate(success=True)


# For Food Section------------------>>
class CreateFood(graphene.Mutation):
    food=graphene.Field(FoodType)
    class Arguments:
        name = graphene.String(required=True)
        location = graphene.String(required=True)
        description = graphene.String(required=True)
        cook = graphene.Boolean(required=True)
        lat = graphene.Float(required=True)
        lon = graphene.Float(required=True)
        price = graphene.Int(required=True)
        image = Upload(required=False)
    def mutate(self,info,**kwargs):
        user=info.context.user

        if user.is_anonymous:
            raise Exception("Login first")
        food=FoodProvider(
            user = user,
            name =  kwargs.get('name'),
            description =kwargs.get('description'),
            cook = kwargs.get('cook'),
            location = kwargs.get('location'),
            lat = kwargs.get('lat'),
            lon = kwargs.get('lon'),
            price =kwargs.get('price')
        )
        food.save()
        if kwargs.get('image')!= None:
            photo=kwargs.get('image')
            image=FoodPhoto(food=food,image=photo)
            image.save()

        return CreateFood(food=food)

class AddFoodImage(graphene.Mutation):
    image=graphene.Field(FoodPhotoType)
    success=graphene.Boolean()
    class Arguments:
        food_id=graphene.Int(required=True)
        image=Upload(required=True)

    def mutate(self,info,food_id,image):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("not logged in")
        food=FoodProvider.objects.get(id=food_id)
        photo=FoodPhoto(food=food,image=image)
        photo.save()
        return AddFoodImage(success=True)

class PickFoodDate(graphene.Mutation):
    date=graphene.Field(FoodTimeType)
    success=graphene.Boolean()
    class Arguments:
        food_id=graphene.Int(required=True)
        date=graphene.String(required=True)
    def mutate(self,info,food_id,date):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("not logged in")
        food=FoodProvider.objects.get(id=food_id)
        date=datetime.datetime.strptime(date, "%Y-%m-%d").date()
        d=FoodTime(food=food,date=date)
        d.save()
        return PickFoodDate(success=True)


# For Events section---------------->>>

class CreateEvent(graphene.Mutation):
    event=graphene.Field(EventType)
    class Arguments:
        name = graphene.String(required=True)
        location = graphene.String(required=True)
        description = graphene.String(required=True)
        lat = graphene.Float(required=True)
        lon = graphene.Float(required=True)
        price = graphene.Int(required=True)
        image = Upload(required=False)
    def mutate(self,info,**kwargs):
        user=info.context.user
        if user.is_anonymous:
            raise Exception("Login first")
        event=Event(
            user = user,
            name =  kwargs.get('name'),
            description =kwargs.get('description'),
            location = kwargs.get('location'),
            lat = kwargs.get('lat'),
            lon = kwargs.get('lon'),
            price =kwargs.get('price')
        )
        event.save()
        if kwargs.get('image')!=None:
            photo=kwargs.get('image')
            image=EventImages(event=event,image=photo)
            image.save() 
        return CreateEvent(event=event)

class AddEventImage(graphene.Mutation):
    image=graphene.Field(EventPhotoType)
    success=graphene.Boolean()
    class Arguments:
        event_id=graphene.Int(required=True)
        image=Upload(required=True)

    def mutate(self,info,event_id,image):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("not logged in")
        event=Event.objects.get(id=event_id)
        photo=EventImages(event=event,image=image)
        photo.save()
        return AddEventImage(success=True)

class PickEventDate(graphene.Mutation):
    date=graphene.Field(EventTimeType)
    success=graphene.Boolean()
    class Arguments:
        event_id=graphene.Int(required=True)
        date=graphene.String(required=True)
    def mutate(self,info,event_id,date):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("not logged in")
        event=Event.objects.get(id=event_id)
        date=datetime.datetime.strptime(date, "%Y-%m-%d").date()
        d=EventTime(event=event,date=date)
        d.save()
        return PickEventDate(success=True)

# For creating user
class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)
    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        doctype = graphene.String(required=True)
        docid =graphene.String(required=True)
        phone = graphene.Argument(BigInt)
        host = graphene.Boolean(required=True)


    def mutate(self, info,username,first_name,last_name,password, email,doctype,docid,phone,host):
        user = User(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name
        )
        user.set_password(password)
        user.save()
        # user=User.objects.get(username=username)
        # print(docid)
        user.profile.docType=doctype
        user.profile.docID=docid
        user.profile.phone=phone
        user.profile.host=host
        user.save()
        # new=User.objects.get(username=username)
        # print(new.profile.docId)
        return CreateUser(user=user)


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    create_sathi=CreateSathi.Field()
    pick_sathi_date=PickSathiDate.Field()
    add_sathi_image=AddSathiImage.Field()
    create_food=CreateFood.Field()
    pick_food_date=PickFoodDate.Field()
    add_food_image=AddFoodImage.Field()
    create_event=CreateEvent.Field()
    pick_event_date=PickEventDate.Field()
    add_event_image=AddEventImage.Field()
    book_data=BookData.Field()