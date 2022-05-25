import { Modal } from "react-bootstrap";
import { useState } from "react";

const FinishedOrderDetails = ({
  city,
  name,
  street,
  houseNumber,
  dishes,
  createdData,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cData = createdData.slice(0, 10);

  return (
    <section className="row  p-3 mt-2">
      <div className="d-flex flex-column ">
        <div>
          <h3>{name}</h3>
          <p>Miasto: {city}</p>
          <p>Data realizacji: {cData}</p>
          <button onClick={handleShow} className="btn-primary align-self-end">
            Szczegóły
          </button>
        </div>
        <hr />
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
          <h3>{name}</h3>
          <p>{city}</p>
          <p>
            Adres dostawy: {street} {houseNumber}
          </p>
          <p>Data realizacji: {cData}</p>
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

export default FinishedOrderDetails;
