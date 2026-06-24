import base64

# Make sure this path is relative to where you run the command
with open('serviceAccountKey.json', 'rb') as f:
    encoded_string = base64.b64encode(f.read()).decode('utf-8')
    print(encoded_string)
