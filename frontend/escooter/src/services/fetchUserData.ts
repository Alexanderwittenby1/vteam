export const fetchUserData = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null; // Om ingen token finns, returnera null
  }

  try {
    const response = await fetch("http://localhost:4000/user/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data, "fetch");
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
