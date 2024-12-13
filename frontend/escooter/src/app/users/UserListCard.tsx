"use client";
import React, { useEffect, useState } from "react";
import { BsTrash, BsPencil } from "react-icons/bs";

function UserListCard() {
  const users = ["Alfred", "Alexander", "Daniel"];

  return (
    <div className="card border border-2 shadow-sm" style={{ width: "100%" }}>
      <div className="card-body">
        <h3 className="card-title text-accent-2">User list</h3>
        <p className="card-text">List of all users.</p>
        <ul className="list-group">
          {users.map((user) => (
            <li className="list-group-item" key={user}>
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">
                  {user}{" "}
                  <span className="badge bg-color-3 rounded-pill">User</span>
                </h5>
                <small>Last active: #</small>
              </div>
              <button type="button" className="btn text-accent-2 btn-sm">
                <BsTrash />
              </button>
              <button type="button" className="btn text-accent-2 btn-sm">
                <BsPencil />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserListCard;
