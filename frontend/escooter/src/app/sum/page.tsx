"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar"; // Importera Navbar-komponenten
import { add } from "./utils"; // Importera add-funktionen

export default function SumPage() {
  const [num1, setNum1] = useState<number | string>("");
  const [num2, setNum2] = useState<number | string>("");

  // Funktion för att hantera form-inmatning
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setNum: React.Dispatch<React.SetStateAction<number | string>>
  ) => {
    const value = e.target.value;
    // Kolla om värdet är ett nummer och uppdatera state
    if (value === "" || !isNaN(Number(value))) {
      setNum(value);
    }
  };

  // Konvertera inmatade värden till nummer för att beräkna summan
  const number1 = typeof num1 === "string" && num1 !== "" ? Number(num1) : 0;
  const number2 = typeof num2 === "string" && num2 !== "" ? Number(num2) : 0;

  return (
    <div>
      <Navbar /> {/* Lägg till navbaren */}
      <h1>Welcome to the sum page</h1>
      <form>
        <div>
          <label>Number 1: </label>
          <input
            type="text"
            value={num1}
            onChange={(e) => handleInputChange(e, setNum1)}
            placeholder="Enter first number"
          />
        </div>
        <div>
          <label>Number 2: </label>
          <input
            type="text"
            value={num2}
            onChange={(e) => handleInputChange(e, setNum2)}
            placeholder="Enter second number"
          />
        </div>
        <button
          type="button"
          onClick={() => alert(`The sum is: ${add(number1, number2)}`)}
        >
          Calculate Sum
        </button>
      </form>
      <p>Sum: {add(number1, number2)}</p> {/* Visar summan av de två numren */}
    </div>
  );
}
