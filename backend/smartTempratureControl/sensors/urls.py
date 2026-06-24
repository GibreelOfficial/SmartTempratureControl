from django.urls import path
from .views import (
    TemperatureAPI, 
    HumidityAPI, 
    SensorTrendAPI, 
    FanControlAPI
)

urlpatterns = [
    # Sensor Readings
    path('temperature/', TemperatureAPI.as_view(), name='temp-api'),
    path('humidity/', HumidityAPI.as_view(), name='humidity-api'),
    
    # Trends (Using the consolidated dynamic view)
    path('trends/<str:metric_type>/', SensorTrendAPI.as_view(), name='sensor-trends'),
    
    # Fan Control
    path('fan-control/', FanControlAPI.as_view(), name='fan-control'),
]