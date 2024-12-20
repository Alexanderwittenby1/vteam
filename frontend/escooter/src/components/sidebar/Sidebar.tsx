import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import AdminSidebar from "../sidebar/AdminSidebar";
import UserSidebar from "../sidebar/UserSidebar";
import Link from "next/link";
import Image from "next/image";
import {
  BsSpeedometer2,
  BsBuilding,
  BsPeople,
  BsScooter,
  BsPersonCircle,
} from "react-icons/bs";
import logo from "../../../public/gogo.png";
import { fetchUserData } from "../../services/fetchUserData";
import { hasPermission } from "@/services/rbac";

const Sidebar = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:4000/user/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const user = await res.json();

  console.log(user);

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
        {hasPermission(user.role, "adminView") && <AdminSidebar />}
        {hasPermission(user.role, "userView") && <UserSidebar />}
      </ul>
      <div className="d-flex align-items-center">
        <BsPersonCircle
          className="bi me-2"
          style={{ color: "#6d3170", width: "32px", height: "32px" }}
        />
        <span className="fs-4 text-accent-2">{user.email}</span>
      </div>
    </div>
  );
};

export default Sidebar;
