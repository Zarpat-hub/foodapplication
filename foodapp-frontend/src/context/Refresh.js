import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

const Refresh = () => {
  const loginContext = useContext(LoginContext);
  let navigate = useNavigate();
  useEffect(() => {
    try {
      (async () => {
        const res = await fetch("http://localhost:8080/User/claims", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const x = await res.json();
        // console.log(x);
        loginContext.setID(x[0].value);
        loginContext.setName(x[1].value);
        loginContext.setEmail(x[2].value);
        loginContext.setRole(x[3].value);
        loginContext.setToken(x[4].value);

        if (loginContext.role === "Worker") {
          navigate("/workerpage");
        }
      })();
    } catch (e) {
      console.log(e);
    }
  });
};

export default Refresh;
