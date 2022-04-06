//import jwtDecode from "jwt-decode";
import { useState } from "react";
import { BsFacebook } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  let navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    console.log("Loguj");

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
        setError(false);

        navigate("/");
      })
      .catch((res) => {
        setPassword("");
        setMail("");
        setError(true);
        console.log(res);
      });
  };

  return (
    <section className="col-sm-6">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title text-center mb-4 mt-1">Zaloguj</h4>
          <hr />
          <form onSubmit={submit}>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {<BsFacebook size={25} />}
                  </span>
                </div>
                <input
                  name=""
                  className="form-control"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setMail(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {<BsFacebook size={25} />}
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="******"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="submit"
                className="btn btn-primary btn-block"
                value="Zaloguj"
              />
            </div>
          </form>
          {error ? "Podano zły email lub hasło" : " "}
        </div>
      </div>
    </section>
  );
};
export default Login;
