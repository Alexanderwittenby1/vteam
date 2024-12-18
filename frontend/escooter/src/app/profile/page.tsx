// src/app/profile/page.tsx
"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import RecentTransactions from "../../components/UserDashboard/RecentTransactions";
import RecentTrips from "../../components/UserDashboard/RecentTripsUser";
import { fetchUserData } from "../../services/fetchUserData";
import { hasPermission } from "../../services/rbac";
import StatCard from "../../components/UserDashboard/StatCard";
import { BsBarChart, BsScooter, BsTree, BsWallet2 } from "react-icons/bs";
import StripeWrapper from "../../components/StripeWrapper"; // Importera StripeWrapper

// Dynamiskt importera CheckoutForm, endast på klientsidan
const CheckoutForm = dynamic(() => import("../../components/CheckoutForm"), {
  ssr: false, // Disable server-side rendering for this component
});

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const userData = await fetchUserData();
      setUser(userData);
      console.log(userData, "sidebar");
    };

    getUserData();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="d-flex bg-color-2 p-3" style={{ height: "100vh", width: "100%" }}>
      <div style={{ flex: "0 0 280px", height: "100%" }}>
        <Sidebar />
        {/* Wrappa CheckoutForm med StripeWrapper */}
        <StripeWrapper>
          <CheckoutForm />
        </StripeWrapper>
      </div>

      <div className="d-flex flex-column" style={{ flex: "1", overflowY: "auto" }}>
        {hasPermission(user.role, "adminView") && (
          <div className="admin-dash d-flex justify-content-around" style={{ width: "100%", height: "50vh" }}>
            Admin-innehåll
          </div>
        )}

        {hasPermission(user.role, "userView") && (
          <div>
            <div className="container">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <RecentTrips />
                </div>
                <div className="col-md-6 mb-3">
                  <RecentTransactions />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <StatCard stat={"46km"} text={"Total distance travelled"} icon={BsBarChart} />
                </div>
                <div className="col-md-3 mb-3">
                  <StatCard stat={"24"} text={"Trips made"} icon={BsScooter} />
                </div>
                <div className="col-md-3 mb-3">
                  <StatCard stat={"5.3kg CO₂"} text={"Carbon saved"} icon={BsTree} />
                </div>
                <div className="col-md-3 mb-3">
                  <StatCard stat={"323,87kr"} text={"Balance"} icon={BsWallet2} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
