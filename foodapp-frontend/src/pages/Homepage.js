import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import Refresh from "../context/Refresh";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import s1 from "../img/s1.jpg";

const Homepage = () => {
  const loginContext = useContext(LoginContext);

  let navigate = useNavigate();

  if (LoginContext.role === "Worker") {
    console.log("KONTO PRACOWNIKA");
    navigate("/workpage");
  }

  Refresh();
  return (
    <section>
      <section className="text-center p-2">
        <h2>Homepage</h2>
        {loginContext.name}
        {loginContext.role}
      </section>
      <Carousel>
        <Carousel.Item interval={1000}>
          <img className="d-block w-100" src={s1} alt="First slide" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img className="d-block w-100" src={s1} alt="Second slide" />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={s1} alt="Third slide" />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

export default Homepage;
