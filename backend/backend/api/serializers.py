from rest_framework import serializers
from api.models import User, Sathi,Photo
class UserSerialiser(serializers.HyperlinkedModelSerializer):
    class Meta:
        abstract = True
        model = User
        fields = ['url','first_name',]

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

    # def create(self, validated_data):
    #     images_data = self.context.get('view').request.FILES
    #     sathi = Sathi.objects.create(name=validated_data.get('name'),email=validated_data.get('email'),phone=validated_data.get('phone'),description=validated_data.get('description'),available=validated_data.get('available'),Afrom=validated_data.get('Afrom'),to=validated_data.get('to'),languages=validated_data.get('languages'),interests=validated_data.get('interests'),places=validated_data.get('places'))
    #     for image_data in images_data:
    #         Photo.objects.create(**image_data,sathi=sathi)
    #     return  sathi

