# Generated by Django 3.0.2 on 2020-02-06 07:30

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BookingData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fname', models.CharField(max_length=50)),
                ('lname', models.CharField(max_length=50)),
                ('docType', models.CharField(choices=[('passport', 'PASSPORT'), ('license', 'LICENSE'), ('citizen', 'CITIZENSHIP')], default='', max_length=10)),
                ('docID', models.CharField(max_length=50)),
                ('phone', models.CharField(max_length=15)),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('location', models.CharField(default='Kathmandu', max_length=50)),
                ('lat', models.FloatField(default=0.0)),
                ('lon', models.FloatField(default=0.0)),
                ('datetime', models.DateTimeField(default=datetime.datetime(2020, 2, 6, 7, 30, 57, 813994))),
                ('host', models.CharField(max_length=50)),
                ('pricing', models.CharField(blank=True, max_length=50)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='FoodProvider',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('location', models.CharField(max_length=100)),
                ('dishes', models.CharField(max_length=100)),
                ('cook', models.BooleanField()),
                ('price', models.IntegerField(default=200)),
                ('lat', models.FloatField(default=0.0)),
                ('lon', models.FloatField(default=0.0)),
            ],
        ),
        migrations.CreateModel(
            name='Host',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default=None, max_length=30)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.BigIntegerField()),
                ('category', models.CharField(default=None, max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Sathi',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default=None, max_length=30)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.BigIntegerField()),
                ('description', models.TextField(max_length=500)),
                ('available', models.BooleanField()),
                ('time', models.DateTimeField(default=datetime.datetime(2020, 2, 6, 7, 30, 57, 811512))),
                ('duration', models.CharField(max_length=10)),
                ('languages', models.CharField(max_length=50)),
                ('interests', models.CharField(max_length=250)),
                ('location', models.CharField(max_length=300)),
                ('lat', models.FloatField(default=0.0)),
                ('lon', models.FloatField(default=0.0)),
                ('price', models.IntegerField(default=200)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('username', models.CharField(default=None, max_length=15, primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(default=None, max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(max_length=100)),
                ('posted_by', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='api.User')),
            ],
        ),
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(default='', upload_to='images')),
                ('sathi', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='photos', to='api.Sathi')),
            ],
        ),
        migrations.CreateModel(
            name='FoodPhoto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(default='', upload_to='foodimages')),
                ('food', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='photos', to='api.FoodProvider')),
            ],
        ),
        migrations.CreateModel(
            name='EventThumbnail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('thumbnail', models.ImageField(upload_to='thumbnail/', verbose_name='Image')),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.Event')),
            ],
        ),
        migrations.CreateModel(
            name='EventImages',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images/', verbose_name='Image')),
                ('describe', models.TextField()),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='photos', to='api.Event')),
            ],
        ),
    ]
