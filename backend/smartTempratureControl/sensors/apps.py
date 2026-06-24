import os
import json
import base64
from django.apps import AppConfig
from firebase_admin import credentials, initialize_app

class SensorsConfig(AppConfig):
    name = 'sensors'

    def ready(self):
        # 1. Get the JSON content from an environment variable
        firebase_json_base64 = os.environ.get('FIREBASE_SERVICE_ACCOUNT_BASE64')
        
        if firebase_json_base64:
            # 2. Decode it
            decoded_json = base64.b64decode(firebase_json_base64).decode('utf-8')
            cred_dict = json.loads(decoded_json)
            cred = credentials.Certificate(cred_dict)
            initialize_app(cred)