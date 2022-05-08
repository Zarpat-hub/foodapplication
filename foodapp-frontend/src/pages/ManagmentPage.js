import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Modal } from "react-bootstrap";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
//import { useNavigate } from "react-router-dom";

const ManagmentPage = () => {
  let { name } = useParams();

  const user = useContext(LoginContext);
  const token = user.token;

  const [info, setInfo] = useState([]);
  const [menu, setMenu] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [cities, setCities] = useState([]);

  const [showAddEmployee, setshowAddEmployee] = useState(false);
  const [showAddDish, setShowAddDish] = useState(false);
  const handleClose = () => {
    setShowAddDish(false);
    setshowAddEmployee(false);
  };
  const handleShowDish = () => setShowAddDish(true);
  const handleShowEmployee = () => setshowAddEmployee(true);

  const [dishName, setDishName] = useState("");
  const [price, setPrice] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cityID, setCityID] = useState("");

  //let navigate = useNavigate();

  // console.log(info);

  useEffect(() => {
    fetch(`http://localhost:8080/Restaurant/${name}`)
      .then((res) => res.json())
      .then((d) => {
        setMenu(d.menu);
        setCities(d.cities);
        setInfo(d);
        setWorkers(d.hasEmployeeAccount);
        setLoaded(true);
      })
      .catch((error) => console.log(error));
  }, [name]);

  const Bearer = `Bearer ${token}`;
  const addDish = () => {
    fetch(`http://localhost:8080/Owner/${name}/menuItem`, {
      method: "POST",
      headers: {
        Authorization: Bearer,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "include",
      body: JSON.stringify({
        name: dishName,
        price: price,
      }),
    })
      .then((res) => {
        console.log(res);
        setDishName("");
        setPrice("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addEmployee = () => {
    console.log("TEST");
    //console.log(nameEmployee);
    console.log(cityID);
    console.log(password);
    console.log(confirmPassword);

    fetch(`http://localhost:8080/Owner/${name}/employee`, {
      method: "POST",
      headers: {
        Authorization: Bearer,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "include",
      body: JSON.stringify({
        password: password,
        confirmPassword: confirmPassword,
        cityID: cityID,
      }),
    })
      .then((res) => {
        console.log(res);
        //setDishName("");
        //setPrice("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const menuList = menu.map((dish) => (
    <div key={dish.id}>
      <p>{dish.name}</p>
      <button>Usuń danie</button>
    </div>
  ));

  const citiesList = cities.map((city) => {
    return (
      <div key={city.id}>
        <p>{city.name}</p>
        <button>
          {workers[city.name]
            ? "Istnieje konto pracownicze"
            : "Brak konta pracowniczego"}
        </button>
      </div>
    );
  });

  const list = cities.map((city) => {
    return (
      <option key={city.id} value={city.id}>
        {city.name}
      </option>
    );
  });

  const handleSelect = (e) => {
    setCityID(e.target.value);
  };

  return (
    <div>
      {!isLoaded ? (
        <Loader />
      ) : (
        <section>
          <h1>Restauracja {info.name}</h1>

          <button onClick={handleShowEmployee}>Dodaj konto pracownicze</button>

          <button onClick={handleShowDish}>Dodaj danie</button>
          <div>
            <h2>Menu</h2>
            {menuList}
          </div>

          <div>
            <h2>Dostępne miasta</h2>
            {citiesList}
          </div>
          <Modal
            show={showAddDish}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Dodawanie dania</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row p-2">
                Nazwa:
                <input
                  type="text"
                  value={dishName}
                  onChange={(e) => setDishName(e.target.value)}
                  required
                />
              </div>
              <div className="row p-2">
                Cena:
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={addDish} className="btn btn-primary">
                Dodaj danie
              </button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={showAddEmployee}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Stwórz konto pracownicze</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row p-2">
                Miasto
                <select onChange={handleSelect}>
                  <option value="">-----</option>
                  {list}
                </select>
              </div>
              <div className="row p-2">
                Hasło:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="row p-2">
                Powtórz hasło:
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={addEmployee} className="btn btn-primary">
                Dodaj pracownika
              </button>
            </Modal.Footer>
          </Modal>
        </section>
      )}
    </div>
  );
};

export default ManagmentPage;
