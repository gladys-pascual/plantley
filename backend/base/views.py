from django.shortcuts import render
from django.http import JsonResponse
from .plants import plants

# Create your views here.


def getRoutes(request):
    routes = [
        '/api/plants/',
        '/api/plants/<id>/',
    ]
    return JsonResponse(routes, safe=False)


def getPlants(request):
    return JsonResponse(plants, safe=False)
