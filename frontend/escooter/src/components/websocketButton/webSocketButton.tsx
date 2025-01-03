'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { sendMessage, registerMessageHandler } from '../../components/websocketClient';

const WebSocketButton = ({ user }: { user: ReactNode }) => {
  const [rideTime, setRideTime] = useState<number | null>(null);
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [rideStarted, setRideStarted] = useState<boolean>(false);
  const user_id = user.user_id;
  console.log("User id in websocketbutton:", user_id);

  useEffect(() => {
    registerMessageHandler((data) => {
      if (data.action === 'ride_ended') {
        setRideTime(data.totalTime);
        setRideStarted(false);
      }
    });
  }, []);

  const getPosition = () => {
    return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  };

  const bookScooter = async () => {
    try {
      const pos = await getPosition();
      setPosition(pos);
      sendMessage({
        action: 'start_ride',
        message: 'Starting the ride!',
        userId: user_id,
        scooterId: 1,
        startLocation: `POINT(${pos.lng} ${pos.lat})`,
      });
      setRideStarted(true);
    } catch (error) {
      console.error('Error getting position:', error);
    }
  };

  const endRide = async () => {
    try {
      const endPos = await getPosition();
      sendMessage({
        action: 'end_ride',
        message: 'Ending the ride!',
        userId: user_id,
        scooterId: 1,
        endLocation: `POINT(${endPos.lng} ${endPos.lat})`,
      });
    } catch (error) {
      console.error('Error getting position:', error);
    }
  };

  return (
    <div>
      {!rideStarted ? (
        <button className='btn btn-primary' onClick={bookScooter}>Book scooter</button>
      ) : (
        <button className='btn btn-primary' onClick={endRide}>End Ride</button>
      )}
      {rideTime !== null && (
        <div>
          <p>Your ride lasted: {rideTime} seconds</p>
          <p>Total cost: {rideTime * 1.5} SEK</p>
        </div>
      )}
    </div>
  );
};

export default WebSocketButton;