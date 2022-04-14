import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BiKey } from "react-icons/bi";
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
      <div className="card d-flex align-items-center">
        <div className="card-body">
          <h4 className="card-title text-center mb-4 mt-1">Zaloguj</h4>
          <hr />
          <form onSubmit={submit}>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <CgProfile size={25} />
                  </span>
                </div>
                <input
                  name=""
                  className="form-control"
                  placeholder="email"
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setMail(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <BiKey size={25} />
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="password"
                  type="password"
                  required
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
