import Login from "../components/Login";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Loginpage = () => {
  return (
    <section className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <Login />

      <div className="d-flex flex-column">
        <LinkContainer to="/register">
          <Nav.Link>Nie masz konta? Zarejestruj się!</Nav.Link>
        </LinkContainer>
      </div>
    </section>
  );
};

export default Loginpage;
