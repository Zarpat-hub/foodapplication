import { useContext, useEffect } from "react";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import Slajder from "../components/Slajder";
import Refresh from "../context/Refresh";
import { LinkContainer } from "react-router-bootstrap";

const Homepage = () => {
  let navigate = useNavigate();
  const loginContext = useContext(LoginContext);

  useEffect(() => {
    if (loginContext.role === "Worker") {
      console.log("KONTO PRACOWNIKA");
      navigate("/workpage");
    }
    if (loginContext.role === "Owner") {
      console.log("KONTO PRACOWNIKA");
      navigate("/myrestaurants");
    }
  });

  Refresh();
  return (
    <section className="pos-relative">
      <div className="pos-absolute">
        <div className="homepage">
          <h1>FoodApp</h1>
          <div className="d-flex">
            <LinkContainer to="/restaurants">
              <button className="btn btn-success marginBetweenButtons">
                Restauracje
              </button>
            </LinkContainer>
            <LinkContainer to="/register">
              <button className="btn btn-danger">Załóż konto!</button>
            </LinkContainer>
          </div>
        </div>
      </div>

      <section className="vh-100">
        <Slajder />
      </section>
    </section>
  );
};

export default Homepage;
