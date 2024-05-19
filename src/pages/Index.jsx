import React, { useState, useEffect, useRef } from "react";
import { Container, VStack, HStack, Box, Text, Button, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";

const Gauge = ({ label, value, max }) => (
  <Box textAlign="center">
    <CircularProgress value={(value / max) * 100} size="120px" thickness="12px">
      <CircularProgressLabel>{value}</CircularProgressLabel>
    </CircularProgress>
    <Text mt={2}>{label}</Text>
  </Box>
);

const Timer = ({ time }) => {
  const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <Box textAlign="center">
      <Text fontSize="2xl">{formatTime(time)}</Text>
    </Box>
  );
};

const Index = () => {
  const [speed, setSpeed] = useState(30);
  const [panelVoltage, setPanelVoltage] = useState(12);
  const [batteryVoltage, setBatteryVoltage] = useState(11);
  const [motorUsage, setMotorUsage] = useState(5);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [timerRunning]);

  const handleStart = () => setTimerRunning(true);
  const handleStop = () => setTimerRunning(false);
  const handleReset = () => {
    setTimerRunning(false);
    setTimeLeft(3600);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <HStack spacing={4}>
          <Gauge label="Speed" value={speed} max={100} />
          <Gauge label="Panel Voltage" value={panelVoltage} max={24} />
          <Gauge label="Battery Voltage" value={batteryVoltage} max={24} />
          <Gauge label="Motor Usage" value={motorUsage} max={10} />
        </HStack>
        <Box textAlign="center">
          <Text fontSize="xl" mb={2}>
            Time Left
          </Text>
          <Timer time={timeLeft} />
          <HStack spacing={2} mt={2}>
            <Button onClick={handleStart} leftIcon={<FaPlay />} colorScheme="green">
              Start
            </Button>
            <Button onClick={handleStop} leftIcon={<FaPause />} colorScheme="yellow">
              Stop
            </Button>
            <Button onClick={handleReset} leftIcon={<FaRedo />} colorScheme="red">
              Reset
            </Button>
          </HStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
