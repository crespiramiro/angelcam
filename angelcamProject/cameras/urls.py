from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/cameras/', views.api_list_cameras, name='api_list_cameras'),
    path('api/cameras/<int:camera_id>/stream/', views.api_camera_stream, name='api_camera_stream'),
    path('api/cameras/<int:camera_id>/recordings/', views.api_recordings, name='api_recordings'),
]
