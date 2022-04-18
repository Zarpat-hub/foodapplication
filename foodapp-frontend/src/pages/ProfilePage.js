import { useContext, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import { Modal } from "react-bootstrap";

const ProfilePage = () => {
  const user = useContext(LoginContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteAccount = () => {
    console.log("delete");
  };

  return (
    <section>
      <h2>Dzień dobry {user.name}!</h2>
      <p>id: {user.id}</p>
      <p>{user.email}</p>
      <p>{user.role}</p>
      <h4>Twoje zamówienia</h4>
      <button className="btn btn-danger" onClick={handleShow}>
        Usuń konto
      </button>
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

export default ProfilePage;
