import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import Refresh from "../context/Refresh";
import { useNavigate } from "react-router-dom";
import bg2 from "../img/s2.jpg";
import bg3 from "../img/s3.jpg";
//import BackgroundSlider from "react-background-slider";
import { useEffect } from "react";

const Homepage = () => {
  const loginContext = useContext(LoginContext);

  let navigate = useNavigate();

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
    <section className="homepage-bg">
      <div className="homepage-bg-x container text-center d-flex flex-column text-gray">
        <h2>FoodApp</h2>
        <p>coś tam coś tam</p>
      </div>
      <div>
       
      </div>
    </section>
  );
};

export default Homepage;
