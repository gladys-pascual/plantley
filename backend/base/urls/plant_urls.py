from django.urls import path
from base.views import plant_views as views


urlpatterns = [
    path('', views.getPlants, name='plants'),
    path('<str:pk>', views.getPlant, name='plant'),
]
