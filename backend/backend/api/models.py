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
    first_name =  models.CharField(max_length=30, default=None)

