# Generated by Django 3.0.2 on 2020-02-08 12:31

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='datetime',
            field=models.DateTimeField(default=datetime.datetime(2020, 2, 8, 18, 16, 21, 399989)),
        ),
        migrations.AlterField(
            model_name='eventtime',
            name='date',
            field=models.DateField(default=datetime.datetime(2020, 2, 8, 18, 16, 21, 399989)),
        ),
        migrations.AlterField(
            model_name='foodtime',
            name='date',
            field=models.DateField(default=datetime.datetime(2020, 2, 8, 18, 16, 21, 395994)),
        ),
        migrations.AlterField(
            model_name='sathitime',
            name='date',
            field=models.DateField(default=datetime.datetime(2020, 2, 8, 18, 16, 21, 395994)),
        ),
    ]