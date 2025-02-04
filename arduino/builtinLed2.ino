#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

const char* ssid = "Lab Pemrograman";
const char* password = "12345678"; // No password for Wokwi-GUEST
ESP8266WebServer server(80);

const int ledPin = 2; // GPIO2 (D4 on NodeMCU)

String ledState = "off"; // Default state (LED ON because of reversed logic)

void sendCORSHeaders() {
    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.sendHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    server.sendHeader("Access-Control-Allow-Headers", "Content-Type");
}

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    Serial.print("Connecting to WiFi");

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    Serial.println("\nConnected to WiFi");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());

    pinMode(ledPin, OUTPUT);
    digitalWrite(ledPin, LOW); // Ensure LED starts ON (reversed logic)

    server.on("/", HTTP_GET, []() {
        sendCORSHeaders();
        server.send(200, "text/plain", "ESP8266 LED Controller");
    });

    server.on("/led/on", HTTP_GET, []() {
        sendCORSHeaders();
        digitalWrite(ledPin, HIGH); // Turn LED OFF
        ledState = "on";
        server.send(200, "text/plain", "LED is ON");
    });

    server.on("/led/off", HTTP_GET, []() {
        sendCORSHeaders();
        digitalWrite(ledPin, LOW); // Turn LED ON
        ledState = "off";
        server.send(200, "text/plain", "LED is OFF");
    });

    server.on("/status", HTTP_GET, []() {
        sendCORSHeaders();
        String response = "{\"state\": \"" + ledState + "\"}";
        server.send(200, "application/json", response);
    });

    server.begin();
    Serial.println("HTTP server started");
}

void loop() {
    server.handleClient();
}
