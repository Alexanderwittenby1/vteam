import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // CSS för Bootstrap

function RecentTransactions() {
  const items = [1, 2, 3, 4, 5];
  return (
    <div className="card shadow-sm" style={{ width: "40%" }}>
      <div className="card-body">
        <h3 className="card-title text-accent-2">Recent Transactions</h3>
        <p className="card-text">Your most recent transactions</p>
        <ul
          className="list-group"
          style={{ maxHeight: "200px", overflowY: "auto" }}
        >
          {items.map((item) => (
            <li className="list-group-item" key={item}>
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Amount</h5>
                <small>Date: #</small>
              </div>
              A - B
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RecentTransactions;
