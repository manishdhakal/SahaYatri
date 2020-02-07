from django.contrib.auth.models import User

import graphene
from graphene_django import DjangoObjectType
from ..models import BookingData

class UserType(DjangoObjectType):
    class Meta:
        model = User

class BookDataType(DjangoObjectType):
    class Meta:
        model = BookingData

class BookData(graphene.Mutation):
    book_data=graphene.Field(BookDataType)
    class Arguments:
        fname = graphene.String(required=True)
        lname = graphene.String(required=True)
        doc_type = graphene.String(required=True)
        doc_id= graphene.String(required=True)
        phone= graphene.String(required=True)
        user =graphene.Field(UserType)
        sathi_id = graphene.Int(required=False)
        food_id = graphene.Int(required=False)
        event_id = graphene.Int(required=False)

    def mutate(self,info,**kwargs):
        user = info.context.user or None
        if user.is_anonymous:
            raise Exception("You must be logged in!!")

        sathi_id = kwargs.get('sathiId')

        food_id = kwargs.get('foodId')
        event_id = kwargs.get('eventId')



class Query(graphene.AbstractType):
    me = graphene.Field(UserType)
    users = graphene.List(UserType)

    def resolve_users(self, info):
        return User.objects.all().select_related('profile')

    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not logged in!')

        return user


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)
    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        docid =graphene.String(required=True)

    def mutate(self, info,first_name,last_name, username, password, email,docid):
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
        user.profile.docID=docid
        user.save()
        # new=User.objects.get(username=username)
        # print(new.profile.docId)
        return CreateUser(user=user)


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()