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


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createPlant(request):
    data = request.data
    user = request.user
    # plant = Plant.objects.create(

    #     name='Plant name',
    #     price=0,
    #     potSize='Pot size',
    #     description='Plant description',
    #     countInStock=0,
    #     filterByPlantSize='small',
    #     filterByLightRequirements='shade',
    #     light='Light requirements',
    #     water='Water requirements',
    #     tips='Tips',
    #     toxicity='Toxicity',
    # )

    plant = Plant.objects.create(
        name=data['name'],
        price=data['price'],
        potSize=data['potSize'],
        description=data['description'],
        countInStock=data['countInStock'],
        filterByPlantSize=data['filterByPlantSize'],
        filterByLightRequirements=data['filterByLightRequirements'],
        light=data['light'],
        water=data['water'],
        tips=data['tips'],
        toxicity=data['toxicity'],
        userId=user
    )

    serializer = PlantSerializer(plant, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updatePlant(request, pk):
    data = request.data
    plant = Plant.objects.get(id=pk)

    plant.name = data['name']
    plant.price = data['price']
    plant.potSize = data['potSize']
    plant.description = data['description']
    plant.countInStock = data['countInStock']
    plant.filterByPlantSize = data['filterByPlantSize']
    plant.filterByLightRequirements = data['filterByLightRequirements']
    plant.light = data['light']
    plant.water = data['water']
    plant.tips = data['tips']
    plant.toxicity = data['toxicity']

    plant.save()

    serializer = PlantSerializer(plant, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deletePlant(request, pk):
    plant = Plant.objects.get(id=pk)
    plant.delete()
    return Response("Plant item deleted.")
