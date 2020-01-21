from rest_framework import serializers
from api.models import User, Post



class UserSerialiser(serializers.HyperlinkedModelSerializer):
    class Meta:
        abstract = True
        model = User
        fields = ['url','name', 'username']


class PostSerialiser(serializers.HyperlinkedModelSerializer):
    class Meta:
        abstract = True
        model = Post
        fields = ['url','post_id', 'message', 'posted_by']