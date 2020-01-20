from django.urls import path,include

from .views import SathiListView, PhotoListView,UserViewSet, newUser 
from rest_framework import routers

router = routers.DefaultRouter()
router.register('user',UserViewSet)

urlpatterns=[
    path('user/',include(router.urls)),
    path('new-user', newUser),
    path('sathi/',SathiListView.as_view()),
    path('photo/',PhotoListView.as_view()),

]