# Generated by Django 3.2.9 on 2021-12-08 16:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_rename_user_order_userid'),
    ]

    operations = [
        migrations.AddField(
            model_name='plant',
            name='potSize',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
