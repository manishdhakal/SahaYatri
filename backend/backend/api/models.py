from django.db import models
from datetime import datetime
from django.conf import settings
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

# class FreeTime(models.Model):
#     time = models.DateField(null=True)
#     interval_hrs = models.IntegerField()

class Profile(models.Model):
    user = models.OneToOneField(User,related_name='profile',on_delete=models.CASCADE)
    CHOICES_FIELD = (
        ('passport', 'PASSPORT'),
        ('license', 'LICENSE'),
        ('citizen', 'CITIZENSHIP')
    )
    docType = models.CharField(max_length=10, choices=CHOICES_FIELD, default='')
    docID = models.CharField(max_length=50, blank=False)
    phone = models.CharField(max_length=15, blank=False)
    host = models.BooleanField(default=False,blank=False)
    def __str__(self):
        return self.user.username

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

# class Post(models.Model):
#     message = models.CharField(max_length=100)
#     posted_by = models.ForeignKey(User,on_delete=models.CASCADE, default=None)

class Sathi(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,related_name='sathi',on_delete=models.CASCADE)
    name =  models.CharField(max_length=30, default=None)
    email = models.EmailField()
    phone = models.BigIntegerField()
    description = models.TextField(max_length = 500)
    duration = models.CharField(max_length=10)
    languages = models.CharField(max_length=50)
    interests = models.CharField(max_length=250)
    location = models.CharField(max_length=300)
    lat = models.FloatField(default= 0.00)
    lon = models.FloatField(default= 0.00)
    price = models.IntegerField(default = 200)
    approved=models.BooleanField(default=False)

  
    def __str__(self):
        return self.name


class SathiTime(models.Model):
    date = models.DateField(default =datetime.now())
    booked=models.BooleanField(default=False)
    sathi = models.ForeignKey(Sathi,related_name='booktime',on_delete=models.CASCADE)


    def __str__(self):
        return self.sathi.name
class Photo(models.Model):
    image = models.ImageField(upload_to="images",default ="")
    sathi = models.ForeignKey(Sathi,related_name='photos',on_delete=models.CASCADE)


    def __str__(self):
        return self.sathi.name


class FoodProvider(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,related_name='food',on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    location =  models.CharField(max_length=100)
    description =  models.CharField(max_length=100)
    cook = models.BooleanField()
    price = models.IntegerField(default=200)
    lat = models.FloatField(default= 0.00)
    lon = models.FloatField(default= 0.00)
    approved=models.BooleanField(default=False)
    def __str__(self):
        return self.name



class FoodTime(models.Model):
    date = models.DateField(default =datetime.now())
    booked=models.BooleanField(default=False)
    food = models.ForeignKey(FoodProvider,related_name='booktime',on_delete=models.CASCADE)


    def __str__(self):
        return self.food.name
class FoodPhoto(models.Model):
    image = models.ImageField(upload_to="foodimages",default ="")
    food =  models.ForeignKey(FoodProvider,related_name='photos',on_delete=models.CASCADE)
    def __str__(self):
        return self.food.name

class Host(models.Model):
    name =  models.CharField(max_length=30, default=None)
    email = models.EmailField()
    phone = models.BigIntegerField()
    category=models.CharField(max_length=30, default=None)
    def __str__(self):
        return self.name


def get_event_thumbnail(instance, filename):
    id = instance.event.id
    return "thuhmbnail_images/%s" % (id)

def get_event_image(instance, filename):
    id = instance.event.id
    return "display_images/%s" % (id)

class Event(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,related_name='event',on_delete=models.CASCADE)
    name = models.CharField(max_length=50, blank=False)
    location = models.CharField(max_length=50, default="Kathmandu")
    lat = models.FloatField(default= 0.00)
    lon = models.FloatField(default= 0.00)
    price = models.IntegerField(default = 200)
    description = models.TextField()
    approved=models.BooleanField(default=False)

    def __str__(self):
        return self.name

class EventTime(models.Model):
    date = models.DateField(default =datetime.now())
    booked=models.BooleanField(default=False)
    event = models.ForeignKey(Event,related_name='booktime',on_delete=models.CASCADE)
    def __str__(self):
        return self.event.name
class EventThumbnail(models.Model):
    event = models.ForeignKey(Event, on_delete=models.DO_NOTHING)
    thumbnail = models.ImageField(upload_to="thumbnail/", verbose_name='Image')

    def __str__(self):
        return self.event.name

class EventImages(models.Model):
    event = models.ForeignKey(Event, related_name='photos',on_delete=models.DO_NOTHING)
    image = models.ImageField(upload_to="eventimages/", verbose_name='Image')

    def __str__(self):
        return self.event.name

class BookingData(models.Model):  
    user = models.ForeignKey(settings.AUTH_USER_MODEL,related_name="bookingdata",null =True,on_delete=models.CASCADE)
    time = models.IntegerField(default=0)
    category = models.IntegerField(default=0)
    host= models.ForeignKey(User,related_name="bookeddata",null =True,on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

