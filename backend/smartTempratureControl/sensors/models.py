from django.db import models

class TemperatureRecord(models.Model):
    temperature = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

class HumidityRecord(models.Model):
    humidity = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

class FanControl(models.Model):
    is_on = models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now=True)