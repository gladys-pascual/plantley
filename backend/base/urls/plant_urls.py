from django.urls import path
from base.views import plant_views as views


urlpatterns = [
    path('', views.getPlants, name='plants'),
    path('create', views.createPlant, name='plant-create'),
    path('<str:pk>', views.getPlant, name='plant'),
    path('update/<str:pk>', views.updatePlant, name='plant-update'),
    path('delete/<str:pk>', views.deletePlant, name='plant-delete'),
]
