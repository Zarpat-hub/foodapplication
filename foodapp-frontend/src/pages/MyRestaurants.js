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
    <section>
      <h2>Twoje restauracje</h2>
      {restaurants.map((restaurant) => (
        <div key={restaurant.id}>
          <p>{restaurant.name}</p>
          <LinkContainer to={`/management/${restaurant.id}`}>
            <Nav.Link>
              <p>Zarządzaj restauracją</p>
            </Nav.Link>
          </LinkContainer>
          <hr />
        </div>
      ))}

      <LinkContainer to="/addRestaurant">
        <Nav.Link>Dodaj restaurację</Nav.Link>
      </LinkContainer>
    </section>
  );
};

export default MyRestaurants;
