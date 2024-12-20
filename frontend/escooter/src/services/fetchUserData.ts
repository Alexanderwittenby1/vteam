"use client";
export const fetchUserData = async () => {
  try {
    const response = await fetch("http://localhost:4000/user/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Viktigt att inkludera cookies här
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch profile", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};
