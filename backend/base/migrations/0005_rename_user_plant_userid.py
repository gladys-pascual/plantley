# Generated by Django 3.2.9 on 2021-12-06 23:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_plant_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='plant',
            old_name='user',
            new_name='userId',
        ),
    ]
