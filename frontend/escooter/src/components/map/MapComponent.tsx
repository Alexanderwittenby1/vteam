// src/components/map/MapComponent.tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set access token
mapboxgl.accessToken = 'pk.eyJ1IjoiaGFzc2FuYWJkdWxtb3V0aSIsImEiOiJjbTR1ZG1jZTIwZXc1MmtzZ3IxcmsyMzh6In0.e-FogYMEbxQBONfgRwV6Lg';

interface MapComponentProps {
  className?: string;
  center?: [number, number];
  zoom?: number;
}

const MapComponent: React.FC<MapComponentProps> = ({
  className = '',
  center = [15.586, 56.161],
  zoom = 13
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're in browser and container exists
    if (!mapContainer.current) return;

    try {
      // Create map instance
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: center,
        zoom: zoom,
      });

      // Add navigation control
      map.current.addControl(new mapboxgl.NavigationControl());

      // Add geolocate control
      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      });

      map.current.addControl(geolocate);

      // Trigger geolocation after the map loads
      map.current.on('load', () => {
        geolocate.trigger();
      });

    } catch (err) {
      console.error('Error initializing map:', err);
      setError('Failed to initialize map');
    }

    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [center, zoom]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return <div ref={mapContainer} className={`h-full ${className}`} />;
};

export default MapComponent;