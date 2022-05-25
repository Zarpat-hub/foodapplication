import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(false);

  let navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8080/Auth/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          navigate("/login");
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section>
      <section className="mt-5">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card">
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">
                      Rejestracja
                    </h2>

                    <form onSubmit={submit}>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form3Example1cg"
                          className="form-control form-control-lg"
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="form3Example1cg">
                          Twoje imie
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form3Example3cg"
                          className="form-control form-control-lg"
                          onChange={(e) => setMail(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="form3Example3cg">
                          Adres e-mail
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4cg"
                          className="form-control form-control-lg"
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="form3Example4cg">
                          Hasło
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4cdg"
                          className="form-control form-control-lg"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                        <label
                          className="form-label"
                          htmlFor="form3Example4cdg"
                        >
                          Powtórz swoje hasło
                        </label>
                      </div>

                      <div className="d-flex justify-content-center">
                        <input
                          type="submit"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 "
                          value="Zarejestruj"
                          required
                        />
                      </div>
                      <div className="text-center mt-2">
                        {error ? "Rejestracja się nie powiodła" : ""}
                      </div>

                      <p className="text-center text-muted mt-5 mb-0">
                        <LinkContainer to="/login">
                          <Nav.Link>Masz już konto? Zaloguj się!</Nav.Link>
                        </LinkContainer>
                      </p>
                      <p className="text-center text-muted mt-1 mb-0">
                        <LinkContainer to="/registerowner">
                          <Nav.Link>
                            Jesteś właścicielem resraturacji? Zarejestruj się
                            tutaj!
                          </Nav.Link>
                        </LinkContainer>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Register;
