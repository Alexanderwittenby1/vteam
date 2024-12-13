"use client";
import RecentTransactions from "../../components/UserDashboard/RecentTransactions";
import Sidebar from "../../components/Sidebar";
import RecentTrips from "../../components/UserDashboard/RecentTripsUser";
import React, { useEffect, useState } from "react";

function Profile() {
  return (
    <div
      className="d-flex p-3 bg-color-2"
      style={{ height: "calc(100vh + 0px)" }}
    >
      <Sidebar />
      <div
        className=" d-flex justify-content-around"
        style={{ width: "100%", height: "50vh" }}
      >
        <RecentTrips />
        <RecentTransactions />
      </div>
    </div>
  );
}

export default Profile;
