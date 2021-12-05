from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .plants import plants
from rest_framework.response import Response


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
    return Response(plants)


@api_view(['GET'])
def getPlant(request, pk):
    plant = None
    for i in plants:
        if i['id'] == pk:
            plant = i
            break

    return Response(plant)
