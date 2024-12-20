export const fetchUserTrips = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null; // Om ingen token finns, returnera null
  }

  try {
    const response = await fetch("http://localhost:4000/user/trips", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch trips", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error fetching trips:", error);
    return null;
  }
};
