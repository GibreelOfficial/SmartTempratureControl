import asyncio
import serial
import aiohttp

# --- Configuration ---
PORT = '/dev/cu.usbserial-14530'
BAUD_RATE = 9600
BASE_URL = "https://smarttempraturecontrol.onrender.com"
TEMP_THRESHOLD = 30.0

# Initialize serial
try:
    ser = serial.Serial(PORT, BAUD_RATE, timeout=1)
    print(f"Connected to {PORT}")
except Exception as e:
    print(f"Error opening serial port: {e}")
    exit()

last_fan_state = None

async def run_bridge():
    global last_fan_state
    print("Bridge running... Press Ctrl+C to stop.")
    
    async with aiohttp.ClientSession() as session:
        while True:
            # 1. Handle Sensor Data
            if ser.in_waiting > 0:
                line = ser.readline().decode('utf-8').strip()
                if "," in line:
                    try:
                        parts = line.split(",")
                        t_val = float(parts[0])
                        h_val = float(parts[1])
                        
                        # POST sensor data
                        asyncio.create_task(session.post(f"{BASE_URL}/api/temperature/", json={"temperature": t_val}))
                        asyncio.create_task(session.post(f"{BASE_URL}/api/humidity/", json={"humidity": h_val}))
                        
                        # 2. Logic: Handle Fan Control
                        async with session.get(f"{BASE_URL}/api/fan-control/", timeout=2) as resp:
                            ui_on = False
                            if resp.status == 200:
                                data = await resp.json()
                                ui_on = data.get("is_on")
                        
                        final_state = ui_on or (t_val > TEMP_THRESHOLD)
                        
                        # Update hardware and database if state changed
                        if final_state != last_fan_state:
                            # Update Hardware
                            cmd = '1' if final_state else '0'
                            ser.write(cmd.encode())
                            
                            # Sync Database: Update UI when logic changes state
                            # This fires whether it turns ON or OFF
                            asyncio.create_task(session.post(f"{BASE_URL}/api/fan-control/", json={"is_on": final_state}))
                            
                            last_fan_state = final_state
                            print(f"Syncing: Fan -> {'ON' if final_state else 'OFF'} (Temp: {t_val}°C)")
                            
                    except Exception as e:
                        print(f"Processing error: {e}")

            await asyncio.sleep(0.5) # Reduced sleep for faster response

if __name__ == "__main__":
    asyncio.run(run_bridge())