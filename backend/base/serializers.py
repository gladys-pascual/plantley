from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Plant


class PlantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plant
        fields = '__all__'
