# Generated by Django 3.0.2 on 2020-02-09 06:00

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20200208_1816'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='datetime',
            field=models.DateTimeField(default=datetime.datetime(2020, 2, 9, 11, 45, 12, 420390)),
        ),
        migrations.AlterField(
            model_name='eventtime',
            name='date',
            field=models.DateField(default=datetime.datetime(2020, 2, 9, 11, 45, 12, 421388)),
        ),
        migrations.AlterField(
            model_name='foodtime',
            name='date',
            field=models.DateField(default=datetime.datetime(2020, 2, 9, 11, 45, 12, 418395)),
        ),
        migrations.AlterField(
            model_name='sathitime',
            name='date',
            field=models.DateField(default=datetime.datetime(2020, 2, 9, 11, 45, 12, 415403)),
        ),
    ]
