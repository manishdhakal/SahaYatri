from django.contrib import admin
from .models import Sathi, Photo,FoodProvider,FoodPhoto,Host,Profile
from .models import EventImages, Event, BookingData,FoodTime,SathiTime,EventTime
# Register your models here.

admin.site.register(Sathi)
admin.site.register(Photo)
admin.site.register(FoodProvider)
admin.site.register(FoodPhoto)
admin.site.register(Host)
admin.site.register(Event)
admin.site.register(EventImages)
admin.site.register(BookingData)
admin.site.register(Profile)
admin.site.register(FoodTime)
admin.site.register(EventTime)
admin.site.register(SathiTime)



