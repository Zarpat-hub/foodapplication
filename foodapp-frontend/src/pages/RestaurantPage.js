import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Cart from "../components/Cart";
import Menu from "../components/Menu";
import Order from "../pages/Order";
import ReactStars from "react-stars";

const Restaurant = () => {
  let { name } = useParams();

  const [info, setInfo] = useState([]);
  const [menu, setMenu] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [city, setCities] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch(`http://localhost:8080/Restaurant/${name}`)
      .then((res) => res.json())
      .then((d) => {
        setMenu(d.menu);
        setCities(d.cities);
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

  const test = (e) => {
    console.log(e);
  };

  return (
    <div>
      {!isLoaded ? (
        <Loader />
      ) : (
        <section>
          <div className="row pt-2">
            <h2 className="pt-3 pb-2">Restauracja {info.name}</h2>
            <p>Ocena</p>
            <ReactStars onChange={test} size={24} />
            <hr />
            <div className="col-md-8 col-sm-12">
              <h3>Menu</h3>
              <Menu products={menu} onAdd={addProduct} />
            </div>
            <div className="col-md-4 col-sm-12">
              <Cart
                cartItems={cartItems}
                removeProduct={removeProduct}
                openOrder={handleShow}
              />
            </div>
          </div>

          <section>
            <Order
              restaurantID={info.id}
              cart={cartItems}
              cities={city}
              handleClose={handleClose}
              show={show}
            />
          </section>
        </section>
      )}
    </div>
  );
};

export default Restaurant;
