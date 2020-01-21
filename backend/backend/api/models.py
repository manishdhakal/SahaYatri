from django.db import models
# Create your models here.

# class FreeTime(models.Model):
#     time = models.DateField(null=True)
#     interval_hrs = models.IntegerField()

class User(models.Model):
    first_name =  models.CharField(max_length=30, default=None)

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
  
    def __str__(self):
        return self.name

class Photo(models.Model):
    image = models.ImageField(upload_to="images",default ="")
    sathi = models.ForeignKey(Sathi,on_delete=models.CASCADE)


    def __str__(self):
        return self.sathi.name


