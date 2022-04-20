import { useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import { Button, Modal } from "react-bootstrap";
const Order = ({ restaurantID, cart, cities, handleClose, show }) => {
  const [cityID, setCityID] = useState();
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");

  const loginContext = useContext(LoginContext);

  const token = loginContext.token;

  const handleSelect = (e) => {
    setCityID(e.target.value);
  };

  const citySelect = cities.map((dat) => (
    <option key={dat.id} value={dat.id}>
      {dat.name}
    </option>
  ));

  const submit = (e) => {
    e.preventDefault();
    if (cart.length !== 0) {
      const order = [];

      cart.forEach((element) => {
        order.push({
          restaurantID: restaurantID,
          cityID: parseInt(cityID),
          dishID: element.id,
          quantity: element.qty,
          street: street,
          houseNumber: houseNumber,
        });
      });

      const Bearer = `Bearer ${token}`;
      fetch("http://localhost:8080/Order", {
        method: "POST",
        headers: {
          Authorization: Bearer,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        credentials: "include",
        body: JSON.stringify(order),
      })
        .then((res) => {
          console.log(res);
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };

  return (
    <section>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Dokonaj zamówienia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Wybierz miasto:
          <select onChange={handleSelect}>
            <option value="">-----</option>
            {citySelect}
          </select>
          <br />
          Ulica:
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <br />
          Numer domu:
          <input
            type="text"
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <form onClick={submit}>
            <input type="submit" />
          </form>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default Order;
