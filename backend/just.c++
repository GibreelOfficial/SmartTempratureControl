#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT11
#define FAN_PIN 9

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
  pinMode(FAN_PIN, OUTPUT);
  
  Serial.println("--- System Initialized: Fan Control Only ---");
}

void loop() {
  float t = dht.readTemperature();

  // If reading is valid, control fan immediately
  if (!isnan(t)) {
    Serial.print("Temperature: ");
    Serial.print(t);
    Serial.println("C");
    
    controlFan(t);
  } else {
    Serial.println("DHT Sensor Error!");
    analogWrite(FAN_PIN, 0); // Safety off
  }
  
  // Minimal delay for sensor stability (1 second is plenty)
  delay(1000); 
}

void controlFan(float temp) {
  int fanSpeed;
  
  // Define temperature range for Kampala indoor comfort
  // Below 25C: Off
  // Above 35C: Full Power
  if (temp < 29.0) {
    fanSpeed = 0;
  } else if (temp > 35.0) {
    fanSpeed = 255;
  } else {
    // Map the range between 25 and 35 to the PWM output range
    fanSpeed = map(temp, 25, 35, 60, 255);
  }
  
  analogWrite(FAN_PIN, fanSpeed);
}