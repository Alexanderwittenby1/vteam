"use client";
import { useState } from "react";

function RegisterForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch("localhost:4000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("User added successfully");
      } else {
        console.error("Failed to add user");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section className="vh-100 ">
      <div className="mask d-flex align-items-center h-100 bg-color-1">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9-col-lg-7 col-xl-6">
              <div className="card shadow" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5 accent-color-2">
                    Login
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="email"
                        id="registerformemail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-control form-control-lg"
                      ></input>
                      <label className="form-label" htmlFor="registerformemail">
                        Email
                      </label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="password"
                        id="registerformemail"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-control form-control-lg"
                      ></input>
                      <label className="form-label" htmlFor="registerformemail">
                        Password
                      </label>
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>

                    <p className="text-center">
                      Dont have an account?{" "}
                      <a href="/register" className="fw-bold accent-color-1">
                        Register here
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterForm;
