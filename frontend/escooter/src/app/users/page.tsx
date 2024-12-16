"use client";

import useUsers from "./getUsers";
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import UserListCard from "./UserListCard";
import { fetchUserData } from "../../services/fetchUserData";

function UserList() {
  return (
    <div
      className="d-flex p-3 bg-color-2"
      style={{ height: "calc(100vh + 0px)" }}
    >
      <Sidebar />
      <div
        className="p-3 d-flex justify-content-around"
        style={{ width: "100%", height: "100vh" }}
      >
        <UserListCard />
      </div>
    </div>
  );
}

export default UserList;
