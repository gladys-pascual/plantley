from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Plant
from base.serializers import PlantSerializer

from rest_framework import status


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


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deletePlant(request, pk):
    plant = Plant.objects.get(id=pk)
    plant.delete()
    return Response("Plant item deleted.")
