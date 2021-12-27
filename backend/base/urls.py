from django.urls import path
from . import views


urlpatterns = [
    path('users/login', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('', views.getRoutes, name='routes'),

    path('users/profile', views.getUserProfile, name='user-profile'),

    path('plants/', views.getPlants, name='plants'),
    path('plants/<str:pk>', views.getPlant, name='plant'),
]
