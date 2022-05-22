import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const MyRestaurants = () => {
  const user = useContext(LoginContext);
  const token = user.token;

  const [restaurants, setResturant] = useState([]);
  const Bearer = `Bearer ${token}`;
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

  return (
    <section className="container mt-3">
      <div className="d-flex justify-content-between">
        <h2>Twoje restauracje</h2>
        <LinkContainer to="/addRestaurant">
          <Nav.Link>
            <button className="btn btn-primary">Dodaj restaurację</button>
          </Nav.Link>
        </LinkContainer>
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
                  <button className="btn btn-danger">X</button>
                </Nav.Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default MyRestaurants;
