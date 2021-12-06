from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Plant
from .serializers import PlantSerializer


# Create your views here.

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
