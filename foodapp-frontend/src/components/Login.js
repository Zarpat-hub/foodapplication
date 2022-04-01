import { useState } from "react";
import { BsFacebook } from "react-icons/bs";
const Login = () => {
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  //const [loggined, setLogin] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    console.log("Loguj");

    await fetch("http://localhost:8080/Auth/token", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
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
        </div>
      </div>
    </section>
  );
};
export default Login;
