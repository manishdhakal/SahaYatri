from django.db import models
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
    time = models.DateTimeField()
    duration = models.CharField(max_length=10)
    languages = models.CharField(max_length=50)
    interests = models.CharField(max_length=250)
    places = models.CharField(max_length=300)
    price = models.IntegerField(default = 200)
  
    def __str__(self):
        return self.name

class Photo(models.Model):
    image = models.ImageField(upload_to="images",default ="")
    sathi = models.ForeignKey(Sathi,on_delete=models.CASCADE)


    def __str__(self):
        return self.sathi.name


class FoodProvider(models.Model):
    name = models.CharField(max_length=100)
    place =  models.CharField(max_length=100)
    dishes =  models.CharField(max_length=100)
    cook = models.BooleanField()
    price = models.IntegerField(default=200)
    def __str__(self):
        return self.name


class FoodPhoto(models.Model):
    image = models.ImageField(upload_to="foodimages",default ="")
    food =  models.ForeignKey(FoodProvider,on_delete=models.CASCADE)
    def __str__(self):
        return self.food.name
