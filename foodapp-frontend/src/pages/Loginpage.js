import Login from "../components/Login";
import { useNavigate } from "react-router-dom";
const Loginpage = () => {
  let navigate = useNavigate();
  return (
    <section>
      <Login />
      Nie masz konta?
      <button onClick={() => navigate("/register")}>Zarejestruj</button>
    </section>
  );
};

export default Loginpage;
