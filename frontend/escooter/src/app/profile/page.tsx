<<<<<<< HEAD
=======
// src/app/profile/page.tsx

import Sidebar from "../../components/sidebar/Sidebar";
>>>>>>> main
import RecentTransactions from "../../components/UserDashboard/RecentTransactions";
import Sidebar from "../../components/sidebar/Sidebar";
import RecentTrips from "../../components/UserDashboard/RecentTripsUser";
import { fetchUserData } from "../../services/fetchUserData";
import { fetchUserTrips } from "../../services/fetchUserTrips";
import { hasPermission } from "../../services/rbac";
import StatCard from "../../components/UserDashboard/StatCard";
import { BsBarChart, BsScooter, BsTree, BsWallet2 } from "react-icons/bs";

<<<<<<< HEAD
function Profile() {
  // const [user, setUser] = useState(null);
  // const [userTrips, setUserTrips] = useState(null);

  // useEffect(() => {
  //   const getUserData = async () => {
  //     const userData = await fetchUserData();
  //     setUser(userData);
  //   };

  //   getUserData();
  // }, []);

  // useEffect(() => {
  //   const getUserTrips = async () => {
  //     const userTrips = await fetchUserTrips();
  //     setUserTrips(userTrips);
  //   };

  //   getUserTrips();
  // }, []);

  // if (!user || !userTrips) {
  //   return <p>Loading...</p>;
  // }

  // const tripData = {
  //   totalDistance: function (userTrips) {
  //     var total = 0;
  //     userTrips.map((trip) => {
  //       total += parseFloat(trip.distance);
  //     });
  //     return total;
  //   },
  //   totalTrips: function (userTrips) {
  //     return userTrips.length;
  //   },
  //   co2: function (userTrips) {
  //     const totalDistance = userTrips.reduce(
  //       (total, trip) => total + parseFloat(trip.distance),
  //       0
  //     );
  //     const co2car = 0.12;
  //     return (totalDistance * co2car).toFixed(2);
  //   },
  // };

  // const recentTrips = userTrips.slice(0, 10);
=======
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
>>>>>>> main

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
<<<<<<< HEAD
                    stat={`${tripData.totalDistance(userTrips)}km`}
=======
                    stat={"46km"}
>>>>>>> main
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
<<<<<<< HEAD
                    stat={`${tripData.co2(userTrips)}kg CO₂`}
=======
                    stat={"5.3kg CO₂"}
>>>>>>> main
                    text={"Carbon saved"}
                    icon={BsTree}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <StatCard
<<<<<<< HEAD
                    stat={`${user.balance}kr`}
=======
                    stat={"323,87kr"}
>>>>>>> main
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
