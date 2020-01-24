from django.urls import path,include

from .views import SathiListView, PhotoShow,UserViewSet, newUser ,SathiUpdater,FoodProviderView,SendMail, EventListView, BookData
from rest_framework import routers

router = routers.DefaultRouter()
router.register('user',UserViewSet)
# router.register('',UserViewSet)



app_name = "api"
urlpatterns=[
    path('user/',include(router.urls)),
    path('new-user', newUser),
    path('sathi/',SathiListView,name="sathilistview"),
    path('food/',FoodProviderView,name="FoodProvider"),
    path('sathi/update/<int:pk>',SathiUpdater,name="SathiUpdater"),
    path('sathi/photo/<int:pk>',PhotoShow,name="PhotoShow"),
    path('sendmail/',SendMail,name="sendmail"),
    path('event/',EventListView,name="eventlistview"),
    path('book/', BookData, name="bookdata")
]