import { useContext, useState, useRef } from "react";
import { LoginContext } from "../context/LoginContext";
import { Modal } from "react-bootstrap";
import { useEffect } from "react";
import Loader from "../components/Loader";
import OrderDetails from "../components/OrderDetails";

const ProfilePage = () => {
  const user = useContext(LoginContext);

  const [show, setShow] = useState(false);
  const [activeOrders, setOrders] = useState([]);
  const [mount, setMonut] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const orders = useRef();
  useEffect(() => {
    if (!mount) {
      const load = async () => {
        const res = await fetch(
          `http://localhost:8080/Order/user/active?userID=${user.id}`
        );
        const data = await res.json();
        if (data.length === 0) {
          console.log("Brak zamówień");
          setMonut(true);
        } else {
          console.log(data);
          setOrders(data);
        }
      };

      load();
      if (activeOrders.length !== 0) {
        if (activeOrders.status !== 400) {
          console.log(activeOrders);
          setMonut(true);
          orders.current = activeOrders.map((data) => (
            <OrderDetails
              key={data.id}
              id={data.id}
              city={data.cityName}
              street={data.street}
              houseNumber={data.houseNumber}
              dishes={data.dishes}
              createdData={data.dataCreated}
            />
          ));
        }
      }
    }
  }, [activeOrders, mount, user.id]);

  const deleteAccount = () => {
    console.log("delete");
  };

  return (
    <section>
      <h2>Dzień dobry {user.name}!</h2>
      <p>id: {user.id}</p>
      <p>{user.email}</p>
      <p>{user.role}</p>
      {user.role === "User" ? (
        <>
          <h4>Aktualne Zamówienia</h4>
          <div className="col-6">{mount ? orders.current : <Loader />}</div>
          <h4>Historia zamówień</h4>
        </>
      ) : (
        ""
      )}

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
