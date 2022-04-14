import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Register from "../components/Register";

const Registerpage = () => {
  return (
    <section>
      <Register />
      <LinkContainer to="/login">
        <Nav.Link>Masz już konto? Zaloguj się!</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/login">
        <Nav.Link>
          Jesteś właścicielem resraturacji? Zarejestruj się tutaj!
        </Nav.Link>
      </LinkContainer>
    </section>
  );
};

export default Registerpage;
