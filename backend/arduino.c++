#include <WiFiNINA.h> // Or your specific WiFi library

char ssid[] = "YOUR_SSID";
char pass[] = "YOUR_PASSWORD";
const char* serverName = "YOUR_DJANGO_SERVER_IP"; 

WiFiClient client;

void loop() {
  int sensorVal = analogRead(tempPin);
  float voltage = (sensorVal / 1023.0) * 5.0;
  float tempC = (voltage - 0.5) * 100.0;

  int motorSpeed = map(tempC, 25, 40, 0, 255);
  motorSpeed = constrain(motorSpeed, 0, 255);
  analogWrite(motorPin, motorSpeed);

  if (client.connect(serverName, 8000)) {
    String payload = "{\"temperature\":" + String(tempC) + "}";
    client.println("POST /api/temperature/ HTTP/1.1");
    client.println("Host: " + String(serverName));
    client.println("Content-Type: application/json");
    client.print("Content-Length: ");
    client.println(payload.length());
    client.println();
    client.println(payload);
    client.stop();
  }
  
  delay(5000); // Send data every 5 seconds to avoid flooding the DB
}