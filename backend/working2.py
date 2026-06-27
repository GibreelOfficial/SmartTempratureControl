import serial
import requests
import time

# --- Configuration ---
PORT = '/dev/cu.usbserial-14530'
BAUD_RATE = 9600
BASE_URL = "https://smarttempraturecontrol.onrender.com"
TEMP_THRESHOLD = 29.0

# Initialize serial
try:
    ser = serial.Serial(PORT, BAUD_RATE, timeout=1)
    print(f"Connected to {PORT}")
except Exception as e:
    print(f"Error opening serial port: {e}")
    exit()

last_fan_state = None

def run_bridge():
    global last_fan_state
    print("Bridge running... Press Ctrl+C to stop.")
    
    while True:
        # 1. Handle Sensor Data
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').strip()
            if "," in line:
                try:
                    # Parse sensor values
                    parts = line.split(",")
                    t_val = float(parts[0])
                    h_val = float(parts[1])
                    
                    # POST sensor data to Django
                    requests.post(f"{BASE_URL}/api/temperature/", json={"temperature": t_val})
                    requests.post(f"{BASE_URL}/api/humidity/", json={"humidity": h_val})
                    
                    # 2. Logic: Handle Fan Control (UI Manual + Temp Auto)
                    resp = requests.get(f"{BASE_URL}/api/fan-control/", timeout=2)
                    ui_on = False
                    if resp.status_code == 200:
                        ui_on = resp.json().get("is_on")
                    
                    # Fan logic: Manual UI ON or Temp > Threshold
                    final_state = ui_on or (t_val > TEMP_THRESHOLD)
                    
                    # Update hardware and database if state changed
                    if final_state != last_fan_state:
                        # Update Hardware
                        cmd = '1' if final_state else '0'
                        ser.write(cmd.encode())
                        
                        # Sync Database so UI updates
                        requests.post(f"{BASE_URL}/api/fan-control/", json={"is_on": final_state})
                        
                        last_fan_state = final_state
                        print(f"Syncing: Fan -> {'ON' if final_state else 'OFF'} (Temp: {t_val}°C)")
                        
                except Exception as e:
                    print(f"Processing error: {e}")

        time.sleep(1)

if __name__ == "__main__":
    run_bridge()