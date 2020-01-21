from django.db import models


# Create your models here.

# class FreeTime(models.Model):
#     time = models.DateField(null=True)
#     interval_hrs = models.IntegerField()

# class User(usr):
    # free_time = models.ForeignKey(FreeTime, related_name='user', on_delete=models.CASCADE)
    # hire_day = models.DateField( blank=True, name=)
    # hire_interval = models.IntegerField(blank=True)

class User(models.Model):
    username = models.CharField(max_length=15, unique=True, default=None, primary_key=True)
    name =  models.CharField(max_length=30, default=None)

class Post(models.Model):
    message = models.CharField(max_length=100)
    posted_by = models.ForeignKey(User,on_delete=models.CASCADE, default=None)

