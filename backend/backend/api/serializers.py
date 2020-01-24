from rest_framework import serializers
from api.models import User, Sathi,Photo,Post,FoodProvider,FoodPhoto, BookingData, Event, EventImages, EventThumbnail
class UserSerialiser(serializers.HyperlinkedModelSerializer):
    class Meta:
        abstract = True
        model = User
        fields = ['url','first_name',]


class PostSerialiser(serializers.HyperlinkedModelSerializer):
    class Meta:
        abstract = True
        model = Post
        fields = ['url','post_id', 'message', 'posted_by']

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['image']
    # image = serializers.ImageField()
    # sathi = serializers.ForeignKey(Sathi)

class SathiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sathi
        fields = ('id','name','email','phone','description','available','time','duration','languages','interests','places',)

class FoodProviderSerializer(serializers.ModelSerializer):
        class Meta:
            model = FoodProvider
            fields =['id','name','place','dishes','cook']

       
class FoodPhotoSerializer(serializers.ModelSerializer):
        class Meta:
            model = FoodPhoto
            fields =['image']


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        abstract = True
        model = Event
        fields = ['id','name', 'datetime', 'description' , 'host',  'location', 'pricing']

class EventThumbnailSeralizer(serializers.ModelSerializer):
    class Meta:
        abstract = True
        model = EventThumbnail
        fields = ['thumbnail','event_id']

class EventImagesSerializer(serializers.ModelSerializer):
    class Meta:
        abstract = True
        model = EventImages
        fields = '__all__'

class BookingDataSerializer(serializers.ModelSerializer):
    class Meta:
        abstract = True
        model = BookingData
        fields = ['fname','lname','docType','docID','phone']