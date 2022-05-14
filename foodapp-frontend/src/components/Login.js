import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Login = () => {
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  let navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    console.log("Loguj");
    setError(false);

    await fetch("http://localhost:8080/Auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setError(false);
          navigate("/");
        }
      })
      .catch((res) => {
        setPassword("");
        setMail("");
        setError(true);
        console.log(res);
      });
  };

  return (
    <section>
      <section className="vh-100">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card">
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Zaloguj</h2>

                    <form onSubmit={submit}>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="email"
                          className="form-control form-control-lg"
                          value={email}
                          onChange={(e) => setMail(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="email">
                          Adres e-mail
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="password"
                          value={password}
                          className="form-control form-control-lg"
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="password">
                          Hasło
                        </label>
                      </div>

                      <div className="d-flex justify-content-center">
                        <input
                          type="submit"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 "
                          value="Zaloguj"
                          required
                        />
                      </div>
                      {error ? (
                        <div className="text-danger">
                          Nieprawidłowy email lub hasło
                        </div>
                      ) : (
                        ""
                      )}
                      <p className="text-center text-muted mt-5 mb-0">
                        <LinkContainer to="/register">
                          <Nav.Link>Nie masz konta? Zarejestruj się</Nav.Link>
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
export default Login;
