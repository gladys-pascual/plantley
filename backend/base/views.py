from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Plant
from .serializers import PlantSerializer


# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        data['username'] = self.user.username
        data['email'] = self.user.email

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/plants/',
        '/api/plants/<id>/',
    ]
    return Response(routes)


@api_view(['GET'])
def getPlants(request):
    plants = Plant.objects.all()
    serializer = PlantSerializer(plants, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getPlant(request, pk):
    plant = Plant.objects.get(id=pk)
    serializer = PlantSerializer(plant, many=False)
    return Response(serializer.data)
