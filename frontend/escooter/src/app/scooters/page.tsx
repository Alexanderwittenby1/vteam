"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "../../components/Navbar"; // Importera Navbar-komponenten
import ScooterList from "../../components/scooterData/scooterlist"; // Importera ScooterList-komponenten

export default function scooters() {
  return (
    <div>
      <Sidebar />
      <h1>Welcome to the scooters page</h1>
      <p>Here you can see a list of scooters</p>
      <ScooterList />
    </div>
  );
}
