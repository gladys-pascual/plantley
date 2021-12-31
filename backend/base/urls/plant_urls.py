from django.urls import path
from base.views import plant_views as views


urlpatterns = [
    path('', views.getPlants, name='plants'),
    path('<str:pk>', views.getPlant, name='plant'),
    path('delete/<str:pk>', views.deletePlant, name='plant-delete'),
]
