# from django.urls import path,include

# from .views import SathiListView, PhotoShow,UserViewSet, newUser ,SathiUpdater,FoodProviderView,SendMail, EventListView, BookData, SathiView,FoodView,EventView
# from rest_framework import routers

# # router.register('',UserViewSet)



# app_name = "api"
# urlpatterns=[
#     path('sathi/',SathiListView,name="sathilistview"),
#     path('sathi/<int:pk>',SathiView,name="sathi"),
#     path('food/',FoodProviderView,name="FoodProvider"),
#     path('food/<int:pk>',FoodView,name="FoodView"),
#     path('sathi/update/<int:pk>',SathiUpdater,name="SathiUpdater"),
#     path('sathi/photo/<int:pk>',PhotoShow,name="PhotoShow"),
#     path('sendmail/',SendMail,name="sendmail"),
#     path('event/',EventListView,name="eventlistview"),
#     path('event/<int:pk>',EventView,name="eventview"),

#     path('book/', BookData, name="bookdata")
# ]