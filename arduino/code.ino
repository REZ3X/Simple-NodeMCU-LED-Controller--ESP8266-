#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

const char* ssid = "Lab Pemrograman";         // Replace with your Wi-Fi SSID
const char* password = "12345678";           // Replace with your Wi-Fi password

ESP8266WebServer server(80);

int ledPin = LED_BUILTIN;                    // LED pin
int ledIntensity = 0;                        // Light intensity (0-100)

void handleLEDOn() {
  ledIntensity = 100;
  analogWrite(ledPin, map(ledIntensity, 0, 100, 0, 1023));
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "text/plain", "LED is ON");
}

void handleLEDOff() {
  ledIntensity = 0;
  analogWrite(ledPin, 0);
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "text/plain", "LED is OFF");
}

void handleSetBrightness() {
  if (server.hasArg("value")) {
    ledIntensity = server.arg("value").toInt();
    ledIntensity = constrain(ledIntensity, 0, 100); // Clamp to 0-100
    analogWrite(ledPin, map(ledIntensity, 0, 100, 0, 1023));
    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.send(200, "text/plain", String("Brightness set to: ") + ledIntensity + "%");
  } else {
    server.send(400, "text/plain", "Missing 'value' parameter");
  }
}
void handleStatus() {
  String state = (ledIntensity > 0) ? "on" : "off";
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "application/json", String("{\"state\":\"") + state + "\"}");
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("WiFi connected!");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  pinMode(ledPin, OUTPUT);
  analogWrite(ledPin, 0); // Turn LED off initially

  server.on("/led/on", handleLEDOn);
  server.on("/led/off", handleLEDOff);
  server.on("/led/brightness", handleSetBrightness);
  server.on("/status", handleStatus); // New route for status

  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  server.handleClient();
}

