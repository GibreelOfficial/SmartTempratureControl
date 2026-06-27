from rest_framework import serializers
from .models import TemperatureRecord, HumidityRecord, FanControl

class TemperatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = TemperatureRecord
        fields = ['id', 'temperature', 'timestamp']
        read_only_fields = ['id', 'timestamp']

class HumiditySerializer(serializers.ModelSerializer):
    class Meta:
        model = HumidityRecord
        fields = ['id', 'humidity', 'timestamp']
        read_only_fields = ['id', 'timestamp']

class FanControlSerializer(serializers.ModelSerializer):
    class Meta:
        model = FanControl
        fields = ['is_on', 'updated_at']
        read_only_fields = ['updated_at']