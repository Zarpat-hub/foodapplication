import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
const Navigation = () => {
  const loginContext = useContext(LoginContext);
  let navigate = useNavigate();

  const logout = async () => {
    await fetch("http://localhost:8080/Auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    loginContext.setName("");
    loginContext.setRole("");
    navigate("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>FoodApp</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/restaurants">
              <Nav.Link>Restauracje</Nav.Link>
            </LinkContainer>

            {loginContext.role === "Owner" ? (
              <>
                <LinkContainer to="/myrestaurants">
                  <Nav.Link>Moje restauracje</Nav.Link>
                </LinkContainer>
              </>
            ) : (
              ""
            )}

            {loginContext.role !== "" ? (
              <LinkContainer to="/profile">
                <Nav.Link>Profil</Nav.Link>
              </LinkContainer>
            ) : (
              " "
            )}
            {loginContext.role !== "" ? (
              <Nav.Link onClick={logout}>Wyloguj</Nav.Link>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>Zaloguj</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
