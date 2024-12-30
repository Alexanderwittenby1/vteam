"use client"
import { redirect } from "next/navigation";
import { useState } from "react";


function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:4000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include", 
      });
      const responseBody = await response.json();
      

      if (response.ok) {
        setErrorMessage(null);
       
        setTimeout(() => {
          redirect("/profile"); // Redirect till profil-sidan
        }, 1000); // Du kan justera fördröjningen här om du vill visa ett meddelande först
      } else {
        setErrorMessage(
          responseBody.message || "Something went wrong during login."
        );
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      console.error("An error occurred:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="vh-100">
      <div className="mask d-flex align-items-center h-100 bg-color-1">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9-col-lg-7 col-xl-6">
              <div className="card shadow" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5 text-accent-2">
                    Login
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="email"
                        id="loginformemail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" htmlFor="loginformemail">
                        Email
                      </label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="password"
                        id="loginformpassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" htmlFor="loginformpassword">
                        Password
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Logging in..." : "Login"}
                    </button>

                    {errorMessage && (
                      <div className="alert alert-danger mt-3">
                        {errorMessage}
                      </div>
                    )}

                    <p className="text-center mt-3">
                      Don't have an account?{" "}
                      <a href="/register" className="fw-bold text-accent-1">
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

export default LoginForm;
