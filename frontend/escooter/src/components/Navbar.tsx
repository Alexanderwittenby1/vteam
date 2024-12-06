import Link from "next/link";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar bg-color-2 p-4">
        <div className="container-fluid">
          <a className="navbar-brand text-accent-2 fw-bold" href="#">
            Car Garage
          </a>
          <ul className="navbar-nav d-flex flex-row gap-3">
            <li className="nav-item">
              <a className="nav-link active text-accent-1" href="#">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-accent-1" href="#">
                Link
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <nav style={{ padding: "10px", backgroundColor: "#333", color: "#fff" }}>
        <ul
          style={{
            display: "flex",
            gap: "15px",
            listStyleType: "none",
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/sum" style={{ color: "#fff", textDecoration: "none" }}>
              Sum
            </Link>
          </li>
          <li>
            <Link
              href="/scooters"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Scooters
            </Link>
          </li>
          <li>
            <Link
              href="/register"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
