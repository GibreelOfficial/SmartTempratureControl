from django.contrib import admin
from .models import TemperatureRecord, HumidityRecord

@admin.register(TemperatureRecord)
class TemperatureRecordAdmin(admin.ModelAdmin):
    list_display = ('temperature', 'timestamp')
    list_filter = ('timestamp',)
    ordering = ('-timestamp',)

@admin.register(HumidityRecord)
class HumidityRecordAdmin(admin.ModelAdmin):
    list_display = ('humidity', 'timestamp')
    list_filter = ('timestamp',)
    ordering = ('-timestamp',)