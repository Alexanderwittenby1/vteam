import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#333", color: "#fff" }}>
      <ul style={{ display: "flex", gap: "15px", listStyleType: "none", margin: 0, padding: 0 }}>
        <li>
          <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>Home</Link>
        </li>
        <li>
          <Link href="/sum" style={{ color: "#fff", textDecoration: "none" }}>Sum</Link>
        </li>
        <li>
          <Link href="/scooters" style={{color: "#fff", textDecoration: "none"}}>Scooters</Link>
        </li>
        <li>
          <Link href="/register" style={{ color: "#fff", textDecoration: "none" }}>Register</Link>
        </li>
        {/* Lägg till fler länkar här om du behöver */}
        
      </ul>
    </nav>
  );
}
