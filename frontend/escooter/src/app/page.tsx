import Link from "next/link"; // Importera Link-komponenten
import Navbar from "../components/Navbar"; // Importera Navbar-komponenten




export default function Home() {
  return (
    <div>
      <Navbar />
      <h1>Welcome to the Home Page</h1>
      <Link href="/sum">Go to Sum Page</Link>
    </div>
  );
}

