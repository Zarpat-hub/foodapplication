import { useState } from "react";
import { useEffect } from "react";

const Homepage = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:8080/User/claims", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const x = await res.json();
      setName(x[1].value);
      setRole(x[3].value);
    })();
  });

  return (
    <section>
      <h2>Homepage</h2>
      {name !== "" ? <p>Twoje imie to: {name}</p> : ""}
      {role !== "" ? <p>Rola: {role}</p> : ""}
    </section>
  );
};

export default Homepage;
