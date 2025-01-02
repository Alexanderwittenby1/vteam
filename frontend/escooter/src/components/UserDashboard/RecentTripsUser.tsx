import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // CSS för Bootstrap

function RecentTrips(props) {
  const items = props.array;
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
            <li className="list-group-item border-0" key={item.trip_id}>
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{`${item.start_location} - ${item.end_location}`}</h5>
                <small>{item.start_time}</small>
              </div>
              {item.distance}km
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RecentTrips;
