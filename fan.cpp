#include <DHT.h>
#define DHTPIN 4
#define DHTTYPE DHT11
#define FAN_PIN 9

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
  pinMode(FAN_PIN, OUTPUT);
}

void loop() {
  // Read sensor
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  
  if (!isnan(h) && !isnan(t)) {
    Serial.print(t);
    Serial.print(",");
    Serial.println(h);
  }

  // Receive instructions from Python
  if (Serial.available() > 0) {
    char cmd = Serial.read();
    if (cmd == '1') digitalWrite(FAN_PIN, HIGH);
    if (cmd == '0') digitalWrite(FAN_PIN, LOW);
  }
  
  delay(2000);
}