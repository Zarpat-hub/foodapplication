const Cart = ({ cartItems, removeProduct }) => {
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);

  const order = () => {
    console.log(cartItems);
  };

  return (
    <section>
      <h3>Zamówienie</h3>
      {cartItems.length === 0 ? (
        <p>Dodaj produkty do zamówienia</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="row">
              <div className="col">{item.name}</div>
              <div className="col">
                <button onClick={() => removeProduct(item)}> - </button>
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
          <button onClick={order}>Zamów</button>
        </div>
      )}
    </section>
  );
};

export default Cart;
