import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Cart = ({ cartItems, removeProduct, openOrder }) => {
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);

  const loginContext = useContext(LoginContext);

  const Render = () => {
    if (loginContext.role === "") {
      return (
        <LinkContainer to="/login">
          <Nav.Link>Zaloguj się aby złożyć zamówienie</Nav.Link>
        </LinkContainer>
      );
    } else {
      return <button onClick={openOrder}>Zamów</button>;
    }
  };

  return (
    <section className="pl-2">
      <h3>Zamówienie</h3>

      {cartItems.length === 0 ? (
        <p>Dodaj produkty do zamówienia</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="row">
              <div className="col">{item.name}</div>
              <div className="col">
                <button
                  className="btn btn-danger btn-block"
                  onClick={() => removeProduct(item)}
                >
                  -
                </button>
              </div>
              <div className="col text-right">
                {item.qty} x {item.price.toFixed(2)}PLN
              </div>
            </div>
          ))}

          <div className="row">
            <div className="col">Do zapłaty: </div>

            <div className="col text-right">{itemsPrice.toFixed(2)}PLN</div>
          </div>
          <div className="mt-5">{Render()}</div>
        </div>
      )}
    </section>
  );
};

export default Cart;
