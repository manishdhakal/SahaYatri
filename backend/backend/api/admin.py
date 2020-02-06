from django.contrib import admin
from .models import Sathi, Photo,FoodProvider,FoodPhoto,Host
from .models import EventImages, Event, BookingData
# Register your models here.

admin.site.register(Sathi)
admin.site.register(Photo)
admin.site.register(FoodProvider)
admin.site.register(FoodPhoto)
admin.site.register(Host)
admin.site.register(Event)
admin.site.register(EventImages)
admin.site.register(BookingData)


