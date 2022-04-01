const Cart = ({ cartItems }) => {
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  return (
    <section>
      <h3>Twoje zamówienie</h3>
      {cartItems.length === 0 ? (
        <h2>Koszyk jest pusty</h2>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="row">
              <div className="col-2">{item.name}</div>

              <div className="col-2 text-right">
                {item.qty} x ${item.price.toFixed(2)}
              </div>
            </div>
          ))}
          {itemsPrice.toFixed(2)}$
        </div>
      )}
    </section>
  );
};

export default Cart;
