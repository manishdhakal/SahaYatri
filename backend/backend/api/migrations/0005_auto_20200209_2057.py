# Generated by Django 3.0.2 on 2020-02-09 15:12

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20200209_1859'),
    ]

    operations = [
        migrations.RenameField(
            model_name='eventtime',
            old_name='sathi',
            new_name='event',
        ),
        migrations.AlterField(
            model_name='eventtime',
            name='date',
            field=models.DateField(default=datetime.datetime(2020, 2, 9, 20, 57, 1, 871716)),
        ),
        migrations.AlterField(
            model_name='foodtime',
            name='date',
            field=models.DateField(default=datetime.datetime(2020, 2, 9, 20, 57, 1, 871716)),
        ),
        migrations.AlterField(
            model_name='sathitime',
            name='date',
            field=models.DateField(default=datetime.datetime(2020, 2, 9, 20, 57, 1, 871716)),
        ),
    ]
