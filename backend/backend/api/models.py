from django.db import models
from datetime import datetime
# Create your models here.

# class FreeTime(models.Model):
#     time = models.DateField(null=True)
#     interval_hrs = models.IntegerField()

class User(models.Model):
    username = models.CharField(max_length=15, unique=True, default=None, primary_key=True)
    name =  models.CharField(max_length=30, default=None)

class Post(models.Model):
    message = models.CharField(max_length=100)
    posted_by = models.ForeignKey(User,on_delete=models.CASCADE, default=None)
class Sathi(models.Model):
    name =  models.CharField(max_length=30, default=None)
    email = models.EmailField()
    phone = models.BigIntegerField()
    description = models.TextField(max_length = 500)
    available = models.BooleanField()
    time = models.DateTimeField(default = datetime.now())
    duration = models.CharField(max_length=10)
    languages = models.CharField(max_length=50)
    interests = models.CharField(max_length=250)
    location = models.CharField(max_length=300)
    lat = models.FloatField(default= 0.00)
    lon = models.FloatField(default= 0.00)
    price = models.IntegerField(default = 200)
  
    def __str__(self):
        return self.name

class Photo(models.Model):
    image = models.ImageField(upload_to="images",default ="")
    sathi = models.ForeignKey(Sathi,related_name='photos',on_delete=models.CASCADE)


    def __str__(self):
        return self.sathi.name


class FoodProvider(models.Model):
    name = models.CharField(max_length=100)
    location =  models.CharField(max_length=100)
    dishes =  models.CharField(max_length=100)
    cook = models.BooleanField()
    price = models.IntegerField(default=200)
    lat = models.FloatField(default= 0.00)
    lon = models.FloatField(default= 0.00)
    def __str__(self):
        return self.name


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
    name = models.CharField(max_length=50, blank=False)
    location = models.CharField(max_length=50, default="Kathmandu")
    lat = models.FloatField(default= 0.00)
    lon = models.FloatField(default= 0.00)
    datetime = models.DateTimeField(default = datetime.now())
    host = models.CharField(max_length=50)
    pricing = models.CharField(max_length=50, blank=True)
    description = models.TextField()

    def __str__(self):
        return self.name

class EventThumbnail(models.Model):
    event = models.ForeignKey(Event, on_delete=models.DO_NOTHING)
    thumbnail = models.ImageField(upload_to="thumbnail/", verbose_name='Image')

    def __str__(self):
        return self.event.name

class EventImages(models.Model):
    event = models.ForeignKey(Event, related_name='photos',on_delete=models.DO_NOTHING)
    image = models.ImageField(upload_to="images/", verbose_name='Image')
    describe = models.TextField(blank=False)

    def __str__(self):
        return self.event.name

class BookingData(models.Model):
    CHOICES_FIELD = (
        ('passport', 'PASSPORT'),
        ('license', 'LICENSE'),
        ('citizen', 'CITIZENSHIP')
    )
    fname = models.CharField(max_length=50, blank=False)
    lname = models.CharField(max_length=50, blank=False)
    docType = models.CharField(max_length=10, choices=CHOICES_FIELD, default='')
    docID = models.CharField(max_length=50, blank=False)
    phone = models.CharField(max_length=15, blank=False)

    def __str__(self):
        return self.fname

