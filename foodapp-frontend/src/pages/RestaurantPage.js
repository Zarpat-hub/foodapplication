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
    setRating(rating + e);
    const x = (rating + e) / (parseInt(revievsNumber) + 1);
    setAverageRating(x);
  };

  return (
    <div>
      {!isLoaded ? (
        <Loader />
      ) : (
        <section className="container min-vh-100 mt-3 containerXD">
          <div className="d-flex justify-content-between">
            <div>
              <h2 className="pt-3 pb-2">Restauracja {info.name}</h2>
            </div>
            <div>
              {user.role === "User" ? (
                <ReactStars
                  onChange={revievFunction}
                  size={24}
                  color2={"#ff9414"}
                />
              ) : (
                ""
              )}
              Ocena {averageRating.toFixed(2)} ({revievsNumber})
            </div>
          </div>
          <div className="row pt-2">
            <hr />
            <div className="col-md-8 col-sm-12 scroll-y">
              <h3>Menu</h3>
              <div>
                <Menu products={menu} onAdd={addProduct} />
              </div>
            </div>
            <div className="col-md-4 col-sm-12 text-md-end">
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
