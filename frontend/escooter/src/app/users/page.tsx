"use client";
import React, { useEffect, useState } from "react";
import useUsers from "./getUsers";
import Sidebar from "../../components/Sidebar";
import UserListCard from "./UserListCard";

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
