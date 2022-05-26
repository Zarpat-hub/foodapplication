import { useEffect, useState, useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyRestaurants = () => {
  const user = useContext(LoginContext);
  const token = user.token;
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [restaurants, setResturant] = useState([]);
  let Bearer = `Bearer ${token}`;
  useEffect(() => {
    fetch(`http://localhost:8080/Owner/owned`, {
      headers: {
        Authorization: Bearer,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((city) => {
        setResturant(city);
      })
      .catch((error) => console.log(error));
  }, [Bearer]);

  const deleteAccount = () => {
    Bearer = `Bearer ${token}`;
    fetch(`http://localhost:8080/User?userID=${user.id}`, {
      method: "DELETE",
      headers: {
        Authorization: Bearer,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "include",
    });

    user.setName("");
    user.setRole("");
    user.setToken("");
    navigate("/");
  };

  const deleteRestaurant = (id) => {
    console.log(id);

    fetch(`http://localhost:8080/Restaurant?restaurantID=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: Bearer,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "include",
    });

    let newRestaurants = [...restaurants];
    newRestaurants = newRestaurants.filter((t) => t.id !== id);
    setResturant(newRestaurants);
  };

  return (
    <section className="container mt-3">
      <div className="d-flex justify-content-between">
        <h2>Twoje restauracje</h2>
        <div className="d-flex">
          <LinkContainer to="/addRestaurant">
            <Nav.Link>
              <button className="btn btn-primary">Dodaj restaurację</button>
            </Nav.Link>
          </LinkContainer>
          <Nav.Link>
            <button className="btn btn-danger" onClick={handleShow}>
              Usuń konto
            </button>
          </Nav.Link>
        </div>
      </div>
      <hr />
      {restaurants.map((restaurant) => (
        <div key={restaurant.id} className="d-flex  p-3 mt-3 card">
          <div className="d-flex justify-content-between">
            <h3>{restaurant.name}</h3>
            <div>
              <div className="d-sm-flex d-xs-flex">
                <LinkContainer to={`/management/${restaurant.id}`}>
                  <Nav.Link>
                    <button className="btn btn-success">
                      Zarządzaj restauracją
                    </button>
                  </Nav.Link>
                </LinkContainer>
                <Nav.Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteRestaurant(restaurant.id)}
                  >
                    X
                  </button>
                </Nav.Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Usuwanie konta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Czy napewno chcesz usunąć konto?</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={deleteAccount}>
            Usuń
          </button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default MyRestaurants;
