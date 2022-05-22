import { LoginContext } from "../context/LoginContext";
import { useContext } from "react";
const WorkerOrderDetails = ({
  city,
  street,
  houseNumber,
  setDishes,
  dishes,
  createdData,
  orderID,
}) => {
  const user = useContext(LoginContext);
  //console.log(dishes);
  const sendOrder = (id) => {
    console.log(id);

    const token = user.token;
    const Bearer = `Bearer ${token}`;

    fetch(`http://localhost:8080/Employee?orderID=${id}`, {
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
          <p>ID ZAMÓWIENIA: {orderID}</p>
          <p>Ulica: {street}</p>
          Zamówienie:
          {dishes.map((dish, i) => {
            return (
              <div key={i}>
                <div>
                  {dish.item1.name} x {dish.item2}
                </div>
              </div>
            );
          })}
          <button
            className="btn-primary align-self-end mt-2"
            onClick={() => sendOrder(orderID)}
          >
            Gotowe
          </button>
        </div>
      </div>
    </section>
  );
};

export default WorkerOrderDetails;
