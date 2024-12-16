import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // CSS för Bootstrap

function RecentTrips() {
  const items = [1, 2, 3, 4, 5];
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h3 className="card-title text-accent-2 fw-bold">Recent Trips</h3>
        <p className="card-text text-color-1 fw-normal">
          Your most recent trips
        </p>
        <ul
          className="list-group"
          style={{ maxHeight: "200px", overflowY: "auto" }}
        >
          {items.map((item) => (
            <li className="list-group-item border-0" key={item}>
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">A to B</h5>
                <small>Date: #</small>
              </div>
              Distance: #
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RecentTrips;
