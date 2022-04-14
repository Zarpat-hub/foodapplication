import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import Refresh from "../context/Refresh";

const Homepage = () => {
  const loginContext = useContext(LoginContext);

  Refresh();
  return (
    <section className="text-center p-2">
      <h2>Homepage</h2>
      {loginContext.name}
      {loginContext.role}
    </section>
  );
};

export default Homepage;
