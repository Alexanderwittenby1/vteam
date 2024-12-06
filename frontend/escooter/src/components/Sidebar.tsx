"use client";

import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BsSpeedometer2,
  BsBuilding,
  BsPeople,
  BsScooter,
  BsPersonCircle,
  BsBoxArrowRight,
} from "react-icons/bs";
import logo from "../../public/gogo.png";
function Sidebar() {
  // State to control the visibility of sublinks, typed as a string or null
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Toggle function for opening/closing sublinks
  const toggleSection = (section: string): void => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div
      className="sidebar bg-color-2 p-3 d-flex flex-column"
      style={{ width: "250px", height: "100vh" }}
    >
      <a className="d-flex flex-column flex-shrink-0 mb-3 mb-md-0 me-md-auto text-accent-2 text-decoration-none fw-bold">
        <Image src={logo} alt="GOGO Logo" style={{ width: "100px" }}></Image>
      </a>
      <hr></hr>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item align-items-center">
          <Link
            className="nav-link d-flex text-accent-2 align-items-center"
            href="/"
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
          <a
            className="nav-link d-flex text-accent-2 align-items-center"
            href="#home"
          >
            <BsPeople className="bi me-2" style={{ color: "#6d3170" }} />
            Users
          </a>
        </li>
      </ul>
      <div className="d-flex align-items-center">
        <BsPersonCircle
          className="bi me-2"
          style={{ color: "#6d3170", width: "32px", height: "32px" }}
        />
        <span className="fs-4 text-accent-2">Alfred</span>
      </div>
    </div>
  );
}

export default Sidebar;
