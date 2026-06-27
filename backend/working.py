import serial
import requests
import time

# --- Configuration ---
PORT = '/dev/cu.usbserial-14530'
BAUD_RATE = 9600
BASE_URL = "https://smarttempraturecontrol.onrender.com"

# Initialize serial
try:
    ser = serial.Serial(PORT, BAUD_RATE, timeout=1)
    print(f"Connected to {PORT}")
except Exception as e:
    print(f"Error opening serial port: {e}")
    exit()

# Define the state tracker at the top level
last_fan_state = None

def run_bridge():
    global last_fan_state  # Explicitly allow function to modify the global variable
    print("Bridge running... Press Ctrl+C to stop.")
    
    while True:
        # 1. Handle Sensor Data
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').strip()
            if "," in line:
                try:
                    t, h = line.split(",")
                    # POST with keys matching Serializers
                    r1 = requests.post(f"{BASE_URL}/api/temperature/", json={"temperature": float(t)})
                    r2 = requests.post(f"{BASE_URL}/api/humidity/", json={"humidity": float(h)})
                    
                    print(f"Sent: T={t}, H={h} | Status: {r1.status_code}, {r2.status_code}")
                except Exception as e:
                    print(f"Data error: {e}")

        # 2. Handle Fan Control
        try:
            resp = requests.get(f"{BASE_URL}/api/fan-control/", timeout=3)
            if resp.status_code == 200:
                is_on = resp.json().get("is_on")
                
                # Check for state change
                if is_on != last_fan_state:
                    cmd = '1' if is_on else '0'
                    ser.write(cmd.encode())
                    last_fan_state = is_on
                    print(f"Fan state updated to: {'ON' if is_on else 'OFF'}")
        except Exception as e:
            print(f"Fan Control Error: {e}")

        time.sleep(1)

if __name__ == "__main__":
    run_bridge()