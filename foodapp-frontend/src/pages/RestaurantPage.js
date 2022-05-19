import { useEffect, useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Cart from "../components/Cart";
import Menu from "../components/Menu";
import Order from "../pages/Order";
import ReactStars from "react-stars";
import { LoginContext } from "../context/LoginContext";

const Restaurant = () => {
  let { name } = useParams();

  const [info, setInfo] = useState([]);
  const [menu, setMenu] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [city, setCities] = useState([]);

  const [show, setShow] = useState(false);

  const [averageRating, setAverageRating] = useState("");
  const [revievsNumber, setRevievsNumber] = useState("");
  const [rating, setRating] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch(`http://localhost:8080/Restaurant/${name}`)
      .then((res) => res.json())
      .then((d) => {
        setMenu(d.menu);
        setCities(d.cities);
        setInfo(d);
        setRating(d.rating);
        setAverageRating(d.averageRating);
        setRevievsNumber(d.reviewsNumber);
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

  const user = useContext(LoginContext);
  const token = user.token;
  const Bearer = `Bearer ${token}`;

  const revievFunction = (e) => {
    //console.log(e);
    //console.log(name);
    fetch(`http://localhost:8080/Restaurant/rating/${name}`, {
      method: "POST",
      headers: {
        Authorization: Bearer,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "include",
      body: e,
    });

    setRevievsNumber((prev) => prev + 1);

    console.log(rating);
    console.log(averageRating);
    console.log(rating + e);
    console.log(revievsNumber);

    const x = (rating + e) / parseInt(revievsNumber);
    console.log(x);
    setRating(rating + e);
    setAverageRating(x);
  };

  return (
    <div>
      {!isLoaded ? (
        <Loader />
      ) : (
        <section>
          <div className="row pt-2">
            <h2 className="pt-3 pb-2">Restauracja {info.name}</h2>
            <p>
              Ocena {averageRating.toFixed(2)} ({revievsNumber})
            </p>
            <ReactStars onChange={revievFunction} size={24} />
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
