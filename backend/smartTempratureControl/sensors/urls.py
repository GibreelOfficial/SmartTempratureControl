from django.urls import path
from .views import TemperatureAPI, HumidityAPI,TemperatureTrendAPI,HumidityTrendAPI,get_sensor_data

urlpatterns = [
    path('temperature/', TemperatureAPI.as_view(), name='temp-api'),
    path('humidity/', HumidityAPI.as_view(), name='humidity-api'),
    path('temperature/trends/', TemperatureTrendAPI.as_view(), name='temp-trends'),
    path('humidity/trends/', HumidityTrendAPI.as_view(), name='humidity-trends'),
    path('sensor-data/', get_sensor_data, name='sensor-data'),
]