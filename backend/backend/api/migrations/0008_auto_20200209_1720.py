# Generated by Django 3.0.2 on 2020-02-09 17:20

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20200209_1707'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eventtime',
            name='date',
            field=models.DateField(default=datetime.datetime(2020, 2, 9, 17, 20, 2, 246102)),
        ),
        migrations.AlterField(
            model_name='foodtime',
            name='date',
            field=models.DateField(default=datetime.datetime(2020, 2, 9, 17, 20, 2, 244705)),
        ),
        migrations.AlterField(
            model_name='sathitime',
            name='date',
            field=models.DateField(default=datetime.datetime(2020, 2, 9, 17, 20, 2, 243623)),
        ),
    ]
