import { BsSpeedometer2, BsCreditCard, BsClockHistory } from "react-icons/bs";

import React, { useState, useEffect } from "react";
import Link from "next/link";

function userSidebar() {
  return (
    <div>
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
          <BsClockHistory className="bi me-2" style={{ color: "#6d3170" }} />
          History
        </a>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link d-flex text-accent-2 align-items-center"
          href="/scooters"
        >
          <BsCreditCard className="bi me-2" style={{ color: "#6d3170" }} />
          Payment
        </Link>
      </li>
    </div>
  );
}

export default userSidebar;
