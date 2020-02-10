import graphene
from graphene_django.types import DjangoObjectType
from .converter import BigInt
from api.models import Sathi,Photo,FoodProvider,FoodPhoto, BookingData, Event, EventImages, EventThumbnail,SathiTime,FoodTime,EventTime
from geopy.distance import geodesic
from django.db.models import Case, When
from graphql_jwt.decorators import login_required
from django.contrib.auth.models import User

class SathiType(DjangoObjectType):
    phone = graphene.Field(BigInt)
    class Meta:
        model = Sathi

class PhotoType(DjangoObjectType):
    class Meta:
        model = Photo

class SathiTimeType(DjangoObjectType):
    class Meta:
        model = SathiTime

# -----------------------------------------------#

class FoodType(DjangoObjectType):
    class Meta:
        model = FoodProvider

class FoodPhotoType(DjangoObjectType):
    class Meta:
        model = FoodPhoto

class FoodTimeType(DjangoObjectType):
    class Meta:
        model = FoodTime
# -----------------------------------------------#

class EventType(DjangoObjectType):
    class Meta:
        model = Event

class EventPhotoType(DjangoObjectType):
    class Meta:
        model = EventImages

class EventTimeType(DjangoObjectType):
    class Meta:
        model = EventTime

# -----------------------------------------------#
class Query(object):
    nearby_sathis = graphene.List(SathiType,
                                  lat = graphene.Float(),
                                  lon = graphene.Float(),
                                  limit = graphene.Float())

    all_sathis=graphene.List(SathiType)

    all_sathi_time=graphene.List(SathiTimeType)
    sathi = graphene.Field(SathiType,
                            id =graphene.Int(),
                            name = graphene.String())

    all_sathi_photos=graphene.List(PhotoType)
    all_foods=graphene.List(FoodType)
    food = graphene.Field(FoodType,
                            id =graphene.Int(),
                            name = graphene.String())
    all_food_photos=graphene.List(FoodPhotoType)
    all_events=graphene.List(EventType)
    event = graphene.Field(EventType,
                            id =graphene.Int(),
                            name = graphene.String())
    all_event_photos=graphene.List(EventPhotoType)

    my_sathis=graphene.List(SathiType, username= graphene.String())
    my_foods=graphene.List(FoodType, username= graphene.String())
    my_events=graphene.List(EventType, username= graphene.String())


    def resolve_all_sathi_time(self,info,**kwargs):
        # id= kwargs.get('id')
        # sathi=Sathi.objects.get(id=id)
        sathis= SathiTime.objects.all()
        # print(sathis)
        return sathis
    def resolve_all_sathis(self,info,**kwargs):
        return Sathi.objects.all()

    @login_required
    def resolve_my_sathis(self,info,**kwargs):
        # user=info.context.user
        username = kwargs.get('username')
        user = User.objects.get(username = username)
        print(user)
        return Sathi.objects.filter(user=user)

    # def resolve_all_sathi_photos(self,info,**kwargs):
    #     return Photo.objects.select_related('sathi').all()
 # -----------------------------------------------------------------------------------#
    def resolve_all_foods(self,info,**kwargs):
        return FoodProvider.objects.all()

    def resolve_my_foods(self,info,**kwargs):
        user=info.context.user
        # print(user)
        return FoodProvider.objects.filter(user=user)

    def resolve_all_food_photos(self,info,**kwargs):
        return FoodPhoto.objects.select_related('food').all()

# -------------------------------------------------------------------------------------#
    def resolve_all_events(self,info,**kwargs):
        return Event.objects.all()

    def resolve_my_events(self,info,**kwargs):
        user=info.context.user
        return Event.objects.filter(user=user)

    def resolve_all_events_photos(self,info,**kwargs):
        return EventImages.objects.select_related('events').all()

# ---------------------------------------------------------------------------------------#
# ---------------------------------------------------------------------------------------#
    def resolve_sathi(self, info, **kwargs):
        id= kwargs.get('id')
        name = kwargs.get('name')

        if id is not None:
            return Sathi.objects.get(id=id)
        if name is not None:
            return Sathi.objects.get(name=name)

    def resolve_food(self, info, **kwargs):
        id= kwargs.get('id')
        name = kwargs.get('name')
        if id is not None:
            return FoodProvider.objects.get(id=id)
        if name is not None:
            return FoodProvider.objects.get(name=name)

    def resolve_event(self, info, **kwargs):

        id= kwargs.get('id')
        name = kwargs.get('name')

        if id is not None:
            return Event.objects.get(id=id)
        if name is not None:
            return Event.objects.get(name=name)

    def resolve_nearby_sathis(self, info, **kwargs):
        lat = kwargs.get('lat')
        lon = kwargs.get('lon')
        limit = kwargs.get('limit')
        if limit is not None:
            travelLimit = limit
        else:
            travelLimit = 25
        checkpoint = [lat, lon]
        sathee = Sathi.objects.all()

        pk_list = []
        for i in range(len(sathee)):
            calculations = geodesic(checkpoint,[sathee[i].lat,sathee[i].lon]).km
            if calculations<travelLimit:
                pk_list.append(sathee[i].id)
                
        # pk_list = [2,1]
        queryset = Sathi.objects.filter(pk__in=pk_list)
        return queryset