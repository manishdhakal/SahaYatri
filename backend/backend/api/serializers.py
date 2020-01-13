from rest_framework import serializers
from api.models import User



class UserSerialiser(serializers.HyperlinkedModelSerializer):
    class Meta:
        abstract = True
        model = User
        fields = ['url','first_name',]
