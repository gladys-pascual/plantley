# Generated by Django 3.2.9 on 2021-12-05 23:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_auto_20211205_2335'),
    ]

    operations = [
        migrations.AddField(
            model_name='plant',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]