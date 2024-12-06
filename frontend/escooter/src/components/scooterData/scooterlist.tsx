import React from "react";
import { useScooterData } from "./useScooterData";

const ScooterList: React.FC = () => {
  const { scooters, loading, error } = useScooterData();

  if (loading) return <div>Laddar...</div>;
  if (error) return <div>Fel: {error}</div>;

  return (
    <div>
      <h2>Scooter Lista</h2>
      <ul>
        {scooters.map((scooter) => (
          <li key={scooter.scooter_id}>
            <strong>Model:</strong> {scooter.scooter_id} <br />
            <strong>Battery Level:</strong> {scooter.battery_level}% <br />
            <strong>Status:</strong> {scooter.status} <br />
            <strong>Last Maintenance:</strong>{" "}
            {new Date(scooter.last_maintenance).toLocaleDateString()} <br />
            {/* Lägg till andra fält som du vill visa */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScooterList;
