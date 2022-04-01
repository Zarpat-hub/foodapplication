import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [roleID] = useState(1);

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
        roleID,
      }),
    });
  };

  return (
    <section>
      <h2>Formularz rejestracyjny</h2>
      <form onSubmit={submit}>
        <div>
          <label>
            e-mail :
            <input type="text" onChange={(e) => setMail(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Imie :
            <input type="text" onChange={(e) => setName(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            hasło :
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            hasło2:
            <input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <input type="submit" value="Zarejestruj" />
        </div>
      </form>
    </section>
  );
};

export default Register;
