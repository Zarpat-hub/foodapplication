import { useContext, useState, useRef, useEffect } from "react";
import { LoginContext } from "../context/LoginContext";
import WorkerOrderDetails from "../components/WorkerOrderDetails";
import Loader from "../components/Loader";

const WorkerPage = () => {
  const user = useContext(LoginContext);
  const [activeOrders, setOrders] = useState([]);
  const [mount, setMonut] = useState(false);
  const token = user.token;
  const orders = useRef();

  useEffect(() => {
    if (!mount) {
      const load = async () => {
        const Bearer = `Bearer ${token}`;
        const res = await fetch(
          `http://localhost:8080/Employee/orders?employeeID=${user.id}`,
          {
            headers: {
              Authorization: Bearer,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            credentials: "include",
          }
        );
        const data = await res.json();
        if (data.length === 0) {
          console.log("Brak zamówień");
          setMonut(true);
        }
        setOrders(data);
      };
      load();
      if (activeOrders.length !== 0) {
        if (activeOrders.status !== 400) {
          console.log(activeOrders);
          setMonut(true);

          orders.current = activeOrders.map((data) => (
            <WorkerOrderDetails
              key={data.id}
              orderID={data.id}
              setDishes={data.setDishes}
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
  }, [activeOrders, mount, user.id, token]);

  return (
    <section className="container">
      <h3>Aktywne zamówienia</h3>
      {mount ? orders.current : <Loader />}
    </section>
  );
};

export default WorkerPage;
