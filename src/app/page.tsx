"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Power, Wifi, WifiOff } from "lucide-react";
import ToggleSwitch from '../components/ToggleSwitch'; // Import the ToggleSwitch component

export default function Home() {
  const [isOn, setIsOn] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const espIP = "http://10.201.0.14";
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Function to check the connection status of the ESP8266
   */
  const checkConnection = async () => {
    try {
      const response = await axios.get(`${espIP}/status`);
      if (response.status === 200) {
        setIsConnected(true);
        setIsOn(response.data.state !== "on");
      }
    } catch {
      setIsConnected(false);
    }
  };

  /**
   * Function to handle the toggle switch action
   */
  const handleToggle = async () => {
    if (isLoading) return;
    setIsLoading(true);
  
    const command = isOn ? "on" : "off";
    try {
      await axios.get(`${espIP}/led/${command}`);
      setIsOn(!isOn);
    } catch (error) {
      console.error("Error controlling LED:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * useEffect hook to periodically check the connection status
   */
  useEffect(() => {
    const interval = setInterval(checkConnection, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Card className="w-full max-w-md bg-gray-800 text-white">
        <CardHeader className="border-b border-gray-700">
          <CardTitle className="text-2xl font-bold text-center">
            ESP8266 LED Controller
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <span className="text-lg">Power</span>
            <ToggleSwitch
              checked={isOn}
              onChange={handleToggle}
            />
          </div>
          <div className="pt-4">
            <div
              className="w-24 h-24 mx-auto rounded-full border-4 border-gray-700"
              style={{ backgroundColor: isOn ? "transparent" : "white" }}
            />
          </div>
          <Button
            variant="outline"
            className={`w-full ${
              isConnected
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
            onClick={checkConnection}
          >
            {isConnected ? (
              <>
                <Wifi className="mr-2 h-4 w-4" /> Connected
              </>
            ) : (
              <>
                <WifiOff className="mr-2 h-4 w-4" /> Disconnected
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}