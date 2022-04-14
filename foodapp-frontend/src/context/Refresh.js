import { useContext, useEffect } from "react";
import { LoginContext } from "../context/LoginContext";

const Refresh = () => {
  const loginContext = useContext(LoginContext);
  useEffect(() => {
    try {
      (async () => {
        const res = await fetch("http://localhost:8080/User/claims", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const x = await res.json();
        console.log(x);
        loginContext.setName(x[1].value);
        loginContext.setRole(x[3].value);
      })();
    } catch (e) {
      console.log(e);
    }
  });
};

export default Refresh;
