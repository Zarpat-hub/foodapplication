import { useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Order = ({ restaurantID, cart, cities, handleClose, show }) => {
  const [cityID, setCityID] = useState();
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");

  const loginContext = useContext(LoginContext);

  const token = loginContext.token;

  let navigate = useNavigate();

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
      fetch(`http://localhost:8080/Order?userID=${loginContext.id}`, {
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
          //console.log(order);
          navigate("/");
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
        <form onSubmit={submit}>
          <Modal.Body>
            <div className="row p-2">
              Wybierz miasto:
              <select onChange={handleSelect} className="form-select">
                <option value="">-----</option>
                {citySelect}
              </select>
            </div>
            <div className="row p-2">
              Ulica:
              <input
                type="text"
                className="form-control"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />
            </div>
            <div className="row p-2">
              Numer domu:
              <input
                type="text"
                className="form-control"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
                required
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <input
              type="submit"
              className="btn btn-success"
              value="Potwierdź zamówienie"
            />
          </Modal.Footer>
        </form>
      </Modal>
    </section>
  );
};

export default Order;
