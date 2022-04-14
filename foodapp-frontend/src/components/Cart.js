import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const Cart = ({ cartItems, removeProduct }) => {
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const order = () => {
    console.log(cartItems);
  };
  const loginContext = useContext(LoginContext);
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
          <div className="mt-5">
            {loginContext.role === "" ? (
              <LinkContainer to="/login">
                <Nav.Link>Zaloguj się aby złożyć zamówienie</Nav.Link>
              </LinkContainer>
            ) : (
              <button onClick={order}>Zamów</button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
