from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Avg
from django.db.models.functions import TruncDay
from .models import TemperatureRecord, HumidityRecord
from .serializers import TemperatureSerializer, HumiditySerializer

class BaseSensorView(generics.ListCreateAPIView):
    """Base class for sensor data to handle common logic."""
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TemperatureAPI(BaseSensorView):
    queryset = TemperatureRecord.objects.all().order_by('-timestamp')
    serializer_class = TemperatureSerializer

class HumidityAPI(BaseSensorView):
    queryset = HumidityRecord.objects.all().order_by('-timestamp')
    serializer_class = HumiditySerializer

class TemperatureTrendAPI(APIView):
    def get(self, request):
        data = TemperatureRecord.objects.annotate(
            date=TruncDay('timestamp')
        ).values('date').annotate(
            avg_value=Avg('temperature')
        ).order_by('date')
        return Response(data)

class HumidityTrendAPI(APIView):
    def get(self, request):
        data = HumidityRecord.objects.annotate(
            date=TruncDay('timestamp')
        ).values('date').annotate(
            avg_value=Avg('humidity')
        ).order_by('date')
        return Response(data)