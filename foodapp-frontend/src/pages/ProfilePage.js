import { useContext, useState, useRef } from "react";
import { LoginContext } from "../context/LoginContext";
import { Modal, NavLink } from "react-bootstrap";
import { useEffect } from "react";
import Loader from "../components/Loader";
import OrderDetails from "../components/OrderDetails";
import FinishedOrderDetails from "../components/FinishedOrderDetails";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const user = useContext(LoginContext);

  const [show, setShow] = useState(false);
  const [activeOrders, setActiveOrders] = useState([]);
  const [finishedOrders, setFinishedOrders] = useState([]);
  const [mount, setMonut] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const ordersActiveRef = useRef();
  const finishedOrdersRef = useRef();

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
          //console.log(data);
          setActiveOrders(data);
        }
      };
      const load2 = async () => {
        const res = await fetch(
          `http://localhost:8080/Order/user/finished?userID=${user.id}`
        );
        const data = await res.json();
        if (data.length === 0) {
          console.log("Brak historii zamówień");
          setMonut(true);
        } else {
          //console.log(data);
          setFinishedOrders(data);
        }
      };

      load();
      load2();
      if (activeOrders.length !== 0) {
        if (activeOrders.status !== 400) {
          console.log(activeOrders);
          setMonut(true);
          ordersActiveRef.current = activeOrders.map((data) => (
            <OrderDetails
              key={data.id}
              id={data.id}
              name={data.restaurantName}
              city={data.cityName}
              street={data.street}
              houseNumber={data.houseNumber}
              dishes={data.dishes}
              createdData={data.dataCreated}
            />
          ));
        }
      }
      /////
      if (finishedOrders.length !== 0) {
        if (finishedOrders.status !== 400) {
          console.log(finishedOrders);

          finishedOrdersRef.current = finishedOrders.map((data) => (
            <FinishedOrderDetails
              key={data.id}
              name={data.restaurantName}
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
  }, [activeOrders, finishedOrders, mount, user.id]);

  const token = user.token;
  const Bearer = `Bearer ${token}`;

  const deleteAccount = () => {
    console.log("delete");
    console.log(user.id);

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
    navigate("/");
  };

  return (
    <section className="container mt-3">
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-column">
          <h2>Dzień dobry {user.name}!</h2>
          <p>Adres e-mail: {user.email}</p>
          <p>Uprawnienia: {user.role}</p>
        </div>
        <NavLink>
          <button className="btn btn-danger" onClick={handleShow}>
            Usuń konto
          </button>
        </NavLink>
      </div>
      {user.role === "User" ? (
        <div className="d-flex flex-column flex-md-row mt-2 mb-5">
          <div className="col-12 col-md-6">
            <h4>Aktualne zamówienia</h4>
            <div className="scroll-y">
              {mount ? ordersActiveRef.current : <Loader />}
            </div>
          </div>
          <div className="col-12 col-md-6 xy ">
            <h4>Historia zamówień</h4>
            <div className="scroll-y">
              {mount ? finishedOrdersRef.current : <Loader />}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

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
