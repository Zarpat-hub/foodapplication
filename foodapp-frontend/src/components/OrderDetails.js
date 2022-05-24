import { Modal } from "react-bootstrap";
import { useState, useContext } from "react";
import { LoginContext } from "../context/LoginContext";
const OrderDetails = ({
  id,
  city,
  street,
  houseNumber,
  dishes,
  createdData,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cData = createdData.slice(0, 10);
  const cHour = createdData.slice(11, 16);

  const user = useContext(LoginContext);
  const token = user.token;
  const Bearer = `Bearer ${token}`;

  const update = (id) => {
    console.log("Update", id);
    fetch(`http://localhost:8080/Order/delivered?orderID=${id}`, {
      method: "POST",
      headers: {
        Authorization: Bearer,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "include",
    }).then((res) => {
      console.log(res);
      window.location.reload(false);
    });
  };

  return (
    <section className="row card p-3 mt-2">
      <div className="d-flex flex-column ">
        <div>
          <p>Miasto: {city}</p>
          <p>Data: {cData}</p>
          <p>Godzina: {cHour}</p>
          <button onClick={handleShow} className="btn-primary align-self-end">
            Szczegóły
          </button>
          <button
            className="btn-success align-self-end"
            onClick={() => update(id)}
          >
            Dostarczono
          </button>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Szczegóły zamówienia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{city}</p>
          <p>
            Adres dostawy: {street} {houseNumber}
          </p>
          <h4>Zamówienie</h4>
          {dishes.map((dish) => (
            <div key={dish.item1.id + 1000}>
              <div>{dish.item1.name}</div>
              <div>Ilość: {dish.item2}</div>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default OrderDetails;
