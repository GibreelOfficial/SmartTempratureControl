import firebase_admin
from firebase_admin import credentials, db

# Use the full path to your serviceAccountKey.json
cred_path = "/Volumes/Data Drive/CodeX/SmartTempratureControl/backend/smartTempratureControl/sensors/serviceAccountKey.json"
cred = credentials.Certificate(cred_path)

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://smtp-49bf6-default-rtdb.europe-west1.firebasedatabase.app/'
})

# Test the connection
ref = db.reference('test')
ref.set({'status': 'connected'})

print("Firebase connection successful!")