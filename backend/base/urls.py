from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('plants/', views.getPlants, name='plants'),
    path('plants/<str:pk>', views.getPlant, name='plant'),
]
