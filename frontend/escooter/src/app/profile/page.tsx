import RecentTransactions from "../../components/UserDashboard/RecentTransactions";
import Sidebar from "../../components/sidebar/Sidebar";
import RecentTrips from "../../components/UserDashboard/RecentTripsUser";
import { fetchUserData } from "../../services/fetchUserData";
import { fetchUserTrips } from "../../services/fetchUserTrips";
import { hasPermission } from "../../services/rbac";
import StatCard from "../../components/UserDashboard/StatCard";
import { BsBarChart, BsScooter, BsTree, BsWallet2 } from "react-icons/bs";

const Profile = async () => {
  const res = await fetch("http://localhost:4000/user/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Viktigt att inkludera cookies här
  });
  const user = await res.json();
  console.log(user);

  return (
    <div
      className="d-flex bg-color-2 p-3"
      style={{ height: "100vh", width: "100%" }}
    >
      <div style={{ flex: "0 0 280px", height: "100%" }}>
        <Sidebar user={user} />
      </div>

      {/* <div
        className="d-flex flex-column"
        style={{ flex: "1", overflowY: "auto" }}
      >
        {hasPermission(user.role, "adminView") && (
          <div
            className="admin-dash d-flex justify-content-around"
            style={{ width: "100%", height: "50vh" }}
          >
            Admin-innehåll
          </div>
        )}

        {hasPermission(user.role, "userView") && (
          <div>
            <div className="container">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <RecentTrips array={recentTrips} />
                </div>
                <div className="col-md-6 mb-3">
                  <RecentTransactions />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <StatCard
                    stat={`${tripData.totalDistance(userTrips)}km`}
                    text={"Total distance travelled"}
                    icon={BsBarChart}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <StatCard
                    stat={tripData.totalTrips(userTrips)}
                    text={"Trips made"}
                    icon={BsScooter}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <StatCard
                    stat={`${tripData.co2(userTrips)}kg CO₂`}
                    text={"Carbon saved"}
                    icon={BsTree}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <StatCard
                    stat={`${user.balance}kr`}
                    text={"Balance"}
                    icon={BsWallet2}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Profile;
