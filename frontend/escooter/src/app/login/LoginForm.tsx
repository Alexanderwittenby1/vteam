import { redirect } from "next/navigation";
import { useState } from "react";

function RegisterForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
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
      });
      const responseBody = await response.json();
      console.log("Response from server:", responseBody);

      if (response.ok) {
        setErrorMessage(null);
        localStorage.setItem("token", responseBody.token);
        localStorage.setItem("is_Admin", responseBody.is_Admin); // Spara token i localStorage
        setTimeout(() => {
          redirect("/profile"); // Redirect till login-sidan
        }, 1000); // Du kan justera fördröjningen här om du vill visa ett meddelande först
      } else {
        setErrorMessage(
          responseBody.message || "Något gick fel vid inloggningen."
        );
      }
    } catch (error) {
      setErrorMessage("Ett fel inträffade. Försök igen senare.");
      console.error("An error occurred:", error);
    } finally {
      setIsSubmitting(false);
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

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Registering..." : "Register"}
                    </button>

                    {errorMessage && (
                      <div className="alert alert-danger mt-3">
                        {errorMessage}
                      </div>
                    )}

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
