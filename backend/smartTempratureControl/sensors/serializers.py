from rest_framework import serializers
from .models import TemperatureRecord, HumidityRecord

class TemperatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = TemperatureRecord
        fields = ['id', 'temperature', 'timestamp']

class HumiditySerializer(serializers.ModelSerializer):
    class Meta:
        model = HumidityRecord
        fields = ['id', 'humidity', 'timestamp']