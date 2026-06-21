from django.apps import AppConfig
import firebase_admin
from firebase_admin import credentials
import os

class SensorsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'sensors'

    def ready(self):
        # Prevent multiple initializations
        if not firebase_admin._apps:
            cred_path = "/Volumes/Data Drive/CodeX/SmartTempratureControl/backend/smartTempratureControl/sensors/serviceAccountKey.json"
            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred, {
                'databaseURL': 'https://smtp-49bf6-default-rtdb.europe-west1.firebasedatabase.app/'
            })