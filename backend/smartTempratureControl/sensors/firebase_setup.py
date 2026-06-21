import firebase_admin
from firebase_admin import credentials, db

def initialize_firebase():
    # Path to the JSON file you downloaded
    cred = credentials.Certificate("/serviceAccountKey.json")
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://smtp-49bf6-default-rtdb.europe-west1.firebasedatabase.app/'
    })