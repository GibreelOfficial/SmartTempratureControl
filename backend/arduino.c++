#include <SoftwareSerial.h>
#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT11
#define FAN_PIN 9

SoftwareSerial esp(2, 3); 
DHT dht(DHTPIN, DHTTYPE);

const char* ssid = "TheCrib";
const char* password = "thecrib.net";
const char* firebaseHost = "smtp-49bf6-default-rtdb.europe-west1.firebasedatabase.app";

void setup() {
  Serial.begin(9600);
  esp.begin(9600);
  dht.begin();
  pinMode(FAN_PIN, OUTPUT);
  
  Serial.println("--- System Initialized ---");
  
  esp.println("AT+RST");
  delay(3000);
  
  esp.println("AT+CWMODE=1");
  delay(1000);
  
  Serial.print("Connecting to WiFi...");
  esp.println("AT+CWJAP=\"" + String(ssid) + "\",\"" + String(password) + "\"");
  delay(10000);
  Serial.println(" Done.");
}

void loop() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if (!isnan(h) && !isnan(t)) {
    Serial.println("Readings -> T: " + String(t) + "C, H: " + String(h) + "%");
    
    controlFan(t);
    
    sendToFirebase("temperature", t);
    delay(2000);
    sendToFirebase("humidity", h);
  } else {
    Serial.println("DHT Sensor Error!");
    analogWrite(FAN_PIN, 0); 
  }
  delay(10000); 
}

void controlFan(float temp) {
  int fanSpeed;
  
  if (temp < 20.0) {
    fanSpeed = 0;
  } else if (temp > 40.0) {
    fanSpeed = 255;
  } else {
    fanSpeed = map(temp, 20, 40, 50, 255);
  }
  
  analogWrite(FAN_PIN, fanSpeed);
  Serial.println("Fan speed set to: " + String(fanSpeed));
}

void sendToFirebase(String key, float value) {
  String path = "/sensor/" + key; 
  String data = String(value);
  
  Serial.print("Connecting to Firebase for " + key + "...");
  esp.println("AT+CIPSTART=\"TCP\",\"" + String(firebaseHost) + "\",80");
  delay(2000);
  dumpResponse();

  String httpRequest = "PUT " + path + ".json HTTP/1.1\r\n";
  httpRequest += "Host: " + String(firebaseHost) + "\r\n";
  httpRequest += "Content-Type: application/json\r\n";
  httpRequest += "Content-Length: " + String(data.length()) + "\r\n";
  httpRequest += "Connection: close\r\n\r\n";
  httpRequest += data;

  Serial.print("Sending data...");
  esp.print("AT+CIPSEND=");
  esp.println(httpRequest.length());
  delay(1000);
  
  esp.print(httpRequest);
  Serial.println(" Request sent.");
  dumpResponse();
  
  esp.println("AT+CIPCLOSE");
  Serial.println("Connection closed.");
}

void dumpResponse() {
  delay(1000);
  while (esp.available()) {
    Serial.write(esp.read());
  }
  Serial.println("");
}