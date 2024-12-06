import { useState, useEffect } from "react";

interface User {
  email: string;
  password: string;
}

export function getUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:4000/user");
        if (!response.ok) {
          throw new Error("Något gick fel vid hämtning av data");
        }
        const data = await response.json();
        console.log("Data received from server:", data);

        // Om data är tomt, hantera det genom att sätta tom array eller visa meddelande
        if (data.message && data.data && Array.isArray(data.data)) {
          setUsers(data.data);
        } else {
          throw new Error("Felaktig datatyp mottagen från servern");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return { users, error, loading };
}

export default getUsers;
