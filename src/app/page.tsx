"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Power, Wifi, WifiOff } from 'lucide-react';

/**
 * Home component that controls an ESP8266 LED.
 * 
 * @component
 * @returns {JSX.Element} The rendered component.
 * 
 * @example
 * <Home />
 * 
 * @remarks
 * This component allows the user to toggle the LED on and off, adjust its brightness, and check the connection status to the ESP8266.
 * 
 * @property {boolean} isOn - State to track if the LED is on or off.
 * @property {number} brightness - State to track the brightness level of the LED.
 * @property {boolean} isConnected - State to track if the connection to the ESP8266 is established.
 * @property {string} espIP - The IP address of the ESP8266.
 * 
 * @function checkConnection - Checks the connection status to the ESP8266.
 * @async
 * @returns {Promise<void>}
 * 
 * @function handleToggle - Toggles the LED on or off.
 * @async
 * @returns {Promise<void>}
 * 
 * @function handleBrightnessChange - Changes the brightness of the LED.
 * @param {number[]} value - The new brightness value.
 * @async
 * @returns {Promise<void>}
 * 
 * @function useEffect - Sets up an interval to check the connection status every 5 seconds.
 * @returns {void}
 * 
 * @returns {JSX.Element} The rendered component.
 */
export default function Home() {
  const [isOn, setIsOn] = useState(false);
  const [brightness, setBrightness] = useState(50);
  const [isConnected, setIsConnected] = useState(false);
  const espIP = "http://10.201.1.252"; // Replace with your ESP8266 IP address

  const checkConnection = async () => {
    try {
      const response = await axios.get(`${espIP}/status`);
      if (response.status === 200) {
        setIsConnected(true);
      }
    } catch {
      setIsConnected(false);
    }
  };

  const handleToggle = async () => {
    const command = isOn ? "off" : "on";
    try {
      await axios.get(`${espIP}/led/${command}`);
      setIsOn(!isOn);
    } catch (error) {
      console.error("Error controlling LED:", error);
    }
  };

  const handleBrightnessChange = async (value: number[]) => {
    setBrightness(value[0]);
    try {
      await axios.get(`${espIP}/led/brightness`, { params: { value: value[0] } });
    } catch (error) {
      console.error("Error setting brightness:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(checkConnection, 5000); // Check connection every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Card className="w-full max-w-md bg-gray-800 text-white">
        <CardHeader className="border-b border-gray-700">
          <CardTitle className="text-2xl font-bold text-center">ESP8266 LED Controller</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <span className="text-lg">Power</span>
            <Switch
              checked={isOn}
              onCheckedChange={handleToggle}
              className="data-[state=checked]:bg-green-500"
            />
          </div>
          <div className="space-y-2">
            <span className="text-lg">Brightness</span>
            <Slider
              value={[brightness]}
              onValueChange={handleBrightnessChange}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="text-right text-sm text-gray-400">{brightness}%</div>
          </div>
          <div className="pt-4">
            <div
              className="w-24 h-24 mx-auto rounded-full border-4 border-gray-700"
              style={{
                backgroundColor: isOn ? `hsl(0, 0%, ${brightness}%)` : 'transparent',
                boxShadow: isOn ? `0 0 20px hsl(0, 0%, ${brightness}%)` : 'none'
              }}
            />
          </div>
          <Button
            variant="outline"
            className={`w-full ${isConnected ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
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
