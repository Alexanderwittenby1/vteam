"use client";

import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BsSpeedometer2,
  BsBuilding,
  BsPeople,
  BsScooter,
  BsPersonCircle,
} from "react-icons/bs";
import logo from "../../public/gogo.png";

function Sidebar() {
  // State to control the visibility of sublinks, typed as a string or null
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Toggle function for opening/closing sublinks
  const toggleSection = (section: string): void => {
    setOpenSection(openSection === section ? null : section);
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token"); // Hämta token från localStorage

      if (!token) {
        // Om det inte finns någon token, omdirigera användaren till login
        window.location.href = "/login"; // Du kan också använda Next.js router för omdirigering
        return;
      }

      try {
        const response = await fetch("http://localhost:4000/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Skicka token i Authorization-headern
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data); // Sätt användardatan i state
          console.log(data);
        } else {
          console.error("Failed to fetch profile", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile(); // Anropa funktionen för att hämta profilinformation
  }, []);

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div
      className="sidebar bg-color-1 p-3 d-flex flex-column rounded shadow"
      style={{ width: "280px", height: "100%" }}
    >
      <a className="d-flex flex-column flex-shrink-0 mb-3 mb-md-0 me-md-auto text-accent-2 text-decoration-none fw-bold">
        <Image src={logo} alt="GOGO Logo" style={{ width: "100px" }}></Image>
      </a>
      <hr></hr>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item align-items-center">
          <Link
            className="nav-link d-flex text-accent-2 align-items-center"
            href="/profile"
          >
            <BsSpeedometer2 className="bi me-2" style={{ color: "#6d3170" }} />
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <a
            className="nav-link d-flex text-accent-2 align-items-center"
            href="#home"
          >
            <BsBuilding className="bi me-2" style={{ color: "#6d3170" }} />
            Cities
          </a>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link d-flex text-accent-2 align-items-center"
            href="/scooters"
          >
            <BsScooter className="bi me-2" style={{ color: "#6d3170" }} />
            Scooters
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link d-flex text-accent-2 align-items-center"
            href="/users"
          >
            <BsPeople className="bi me-2" style={{ color: "#6d3170" }} />
            Users
          </Link>
        </li>
      </ul>
      <div className="d-flex align-items-center">
        <BsPersonCircle
          className="bi me-2"
          style={{ color: "#6d3170", width: "32px", height: "32px" }}
        />
        <span className="fs-4 text-accent-2">{user.email.split("@")[0]}</span>
      </div>
    </div>
  );
}

export default Sidebar;
