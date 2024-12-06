"use client";
import React, { useEffect, useState } from "react";
import useUsers from "./getUsers";

const UserList = () => {
  const { users, error, loading } = useUsers();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
