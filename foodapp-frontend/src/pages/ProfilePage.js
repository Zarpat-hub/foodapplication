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

  const [showDelete, setShowDelete] = useState(false);
  const [showAddBalance, setShowAddBalance] = useState(false);
  const [activeOrders, setActiveOrders] = useState([]);
  const [finishedOrders, setFinishedOrders] = useState([]);
  const [mount, setMonut] = useState(false);
  const [mount2, setMonut2] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleShowAddBalance = () => setShowAddBalance(true);
  const handleShowDeleteBalance = () => setShowAddBalance(false);

  const navigate = useNavigate();

  const [blik, setBlik] = useState("");
  const [balance, setBalance] = useState("");

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
          setMonut(true);
        } else {
          setActiveOrders(data);
        }
      };
      load();

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
    }
    if (!mount2) {
      const load = async () => {
        const res = await fetch(
          `http://localhost:8080/Order/user/finished?userID=${user.id}`
        );

        const data = await res.json();
        // console.log(data);
        if (data.length === 0) {
          console.log("Brak zamówień");
          setMonut2(true);
        } else {
          setFinishedOrders(data);
        }
      };
      load();

      if (finishedOrders.length !== 0) {
        if (finishedOrders.status !== 400) {
          console.log(finishedOrders);
          setMonut2(true);
          finishedOrdersRef.current = finishedOrders.map((data) => (
            <FinishedOrderDetails
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
    }
  }, [activeOrders, finishedOrders, mount2, mount, user.id]);

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
    }).then(() => {
      fetch("http://localhost:8080/Auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }).then(() => {
        user.setName("");
        user.setRole("");
        user.setToken("");
        navigate("/");
      });
    });
  };

  const addBalance = () => {
    const x = parseInt(balance);

    setBalance(parseInt(x).toFixed(2));

    if (blik === "1234") {
      fetch(`http://localhost:8080/User/${user.id}/balance`, {
        method: "POST",
        headers: {
          Authorization: Bearer,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        credentials: "include",
        body: x,
      })
        .then(() => {
          window.location.reload(false);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <section className="container mt-3">
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-column">
          <h2>Dzień dobry {user.name}!</h2>
          <p>Adres e-mail: {user.email}</p>
          <p>Dostępne środki: {Number(user.balance).toFixed(2)} PLN</p>
        </div>
        <div className="d-flex">
          <NavLink>
            <button className="btn btn-primary" onClick={handleShowAddBalance}>
              Dodaj środki
            </button>
          </NavLink>
          <NavLink>
            <button className="btn btn-danger" onClick={handleShowDelete}>
              Usuń konto
            </button>
          </NavLink>
        </div>
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
        show={showDelete}
        onHide={handleCloseDelete}
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
      <Modal
        show={showAddBalance}
        onHide={handleShowDeleteBalance}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Dodanie środków</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Podaj kwotę</p>
          <input
            type="number"
            value={balance}
            className="form-control form-control-lg"
            onChange={(e) => setBalance(e.target.value)}
          />
          <p>Podaj Kod Bilk</p>
          <input
            type="text"
            pattern="\d*"
            maxLength="4"
            className="form-control form-control-lg"
            value={blik}
            onChange={(e) => setBlik(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={addBalance}>
            Dodaj
          </button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default ProfilePage;
