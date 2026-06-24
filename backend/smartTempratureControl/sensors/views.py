from rest_framework import generics, status, views
from rest_framework.response import Response
from django.db.models import Avg
from django.db.models.functions import TruncDay
from .models import TemperatureRecord, HumidityRecord, FanControl
from .serializers import TemperatureSerializer, HumiditySerializer

class BaseSensorView(generics.ListCreateAPIView):
    """Handles both listing and creating sensor records."""
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"status": "success"}, status=status.HTTP_201_CREATED)



# Control views
class TemperatureAPI(BaseSensorView):
    queryset = TemperatureRecord.objects.all().order_by('-timestamp')
    serializer_class = TemperatureSerializer

class HumidityAPI(BaseSensorView):
    queryset = HumidityRecord.objects.all().order_by('-timestamp')
    serializer_class = HumiditySerializer

class SensorTrendAPI(views.APIView):
    """Generic trend API to handle both Temperature and Humidity metrics."""
    def get(self, request, metric_type):
        model = TemperatureRecord if metric_type == 'temperature' else HumidityRecord
        field = 'temperature' if metric_type == 'temperature' else 'humidity'
        
        data = model.objects.annotate(date=TruncDay('timestamp')) \
            .values('date') \
            .annotate(avg_value=Avg(field)) \
            .order_by('date')
            
        return Response(data)

class FanControlAPI(views.APIView):
    """Handles persistent state for the cooling fan."""
    def get_object(self):
        obj, _ = FanControl.objects.get_or_create(id=1)
        return obj

    def get(self, request):
        return Response({"is_on": self.get_object().is_on})

    def post(self, request):
        is_on = request.data.get('is_on')
        if not isinstance(is_on, bool):
            return Response({"error": "Invalid input"}, status=status.HTTP_400_BAD_REQUEST)
            
        control = self.get_object()
        control.is_on = is_on
        control.save()
        return Response({"status": "success", "fan_on": is_on})