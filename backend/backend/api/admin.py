from django.contrib import admin
from .models import Sathi, Photo,FoodProvider,FoodPhoto
# Register your models here.

admin.site.register(Sathi)
admin.site.register(Photo)
admin.site.register(FoodProvider)
admin.site.register(FoodPhoto)