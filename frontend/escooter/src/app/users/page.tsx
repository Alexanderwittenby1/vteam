

import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import UserListCard from "./UserListCard";
import { fetchUserData } from "../../services/fetchUserData";
import { cookies } from 'next/headers'; 
import { getAllUsers } from "../api/(adminRoutes)/getAllUsers/page";


const UserList = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';
  const user = await fetchUserData(token);
  const users = await getAllUsers(token);
  
  return (
    <div
      className="d-flex p-3 bg-color-2"
      style={{ height: "calc(100vh + 0px)" }}
    >
      <Sidebar user={user} />
      <div
        className="p-3 d-flex justify-content-around"
        style={{ width: "100%", height: "100vh" }}
      >
        <UserListCard users={users} />
      </div>
    </div>
  );
}

export default UserList;
