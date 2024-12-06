"use client";
import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token"); // Hämta token från localStorage

      if (!token) {
        // Om det inte finns någon token, omdirigera användaren till login
        window.location.href = "/login"; // Du kan också använda Next.js router för omdirigering
        return;
      }

      try {
        const response = await fetch("http://localhost:4000/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Skicka token i Authorization-headern
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data); // Sätt användardatan i state
        } else {
          console.error("Failed to fetch profile", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile(); // Anropa funktionen för att hämta profilinformation
  }, []);

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {user.email}</p>
      <p>Balance: {user.balance}</p>
      {/* Lägg till fler profilfält här */}
    </div>
  );
}

export default Profile;
