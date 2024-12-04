import { useState, useEffect } from 'react';

interface Scooter {
  scooter_id: number;
  battery_level: string;
  city_id: number;
  is_available: number;
  is_charging: number;
  last_maintenance: string;
  latitude: string;
  longitude: string;
  needs_service: number;
  status: string;
}


export function useScooterData() {
  const [scooters, setScooters] = useState<Scooter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchScooters() {
      try {
        const response = await fetch('http://localhost:4000/scooter/all');
        if (!response.ok) {
          throw new Error('Något gick fel vid hämtning av data');
        }
        const data = await response.json();
        console.log(data);
        setScooters(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchScooters();
  }, []);

  return { scooters, loading, error };
}
