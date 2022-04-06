import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Cart from "../components/Cart";
import Menu from "../components/Menu";

const Restaurant = () => {
  let { name } = useParams();
  let navigate = useNavigate();

  const [info, setInfo] = useState([]);
  const [menu, setMenu] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/Restaurant/${name}`)
      .then((res) => res.json())
      .then((d) => {
        setMenu(d.menu);
        setInfo(d);
        setLoaded(true);
      })
      .catch((error) => console.log(error));
  }, [name]);

  const [cartItems, setCartItems] = useState([]);

  const addProduct = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const removeProduct = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  return (
    <div>
      {!isLoaded ? (
        <Loader />
      ) : (
        <section>
          <div className="row">
            <div>Restauracja {info.name}</div>
            <div className="col-8">
              <h3>Menu</h3>
              <Menu products={menu} onAdd={addProduct} />
            </div>
            <div className="col-sm">
              <Cart cartItems={cartItems} removeProduct={removeProduct} />
            </div>
          </div>

          <button onClick={() => navigate("/restaurants")}>Powrót</button>
        </section>
      )}
    </div>
  );
};

export default Restaurant;
