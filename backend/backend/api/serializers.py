from rest_framework import serializers
from api.models import User, Sathi,Photo



class UserSerialiser(serializers.HyperlinkedModelSerializer):
    class Meta:
        abstract = True
        model = User
        fields = ['url','first_name',]


class SathiSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sathi
        fields = ('name','email','phone','description','available','Afrom','to','languages','interests','places')
        

class PhotoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Photo
        fields = ('image','sathi')
                