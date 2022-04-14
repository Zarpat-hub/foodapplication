import { useEffect } from "react";
import { useState } from "react";
import Loader from "../components/Loader";
import Restaurant from "../components/Restaurant";

const Restaurants = () => {
  const [data, setData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [city, setCity] = useState("");

  const loadData = () => {
    fetch("http://localhost:8080/Restaurant")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoaded(true);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadData();
  }, []);

  const sub = (e) => {
    e.preventDefault();
    console.log("x");
    if (city !== "") {
      fetch(`http://localhost:8080/Restaurant/byCity/${city}`)
        .then((res) => res.json())
        .then((d) => {
          setData(d);
        })
        .catch((error) => console.log(error));
    } else {
      loadData();
    }
  };

  const restaurants = data.map((dat) => (
    <Restaurant key={dat.id} name={dat.name} image={dat.image} id={dat.id} />
  ));
  return (
    <div>
      {!isLoaded ? (
        <Loader />
      ) : (
        <section>
          <div className="row p-5 text-center d-flex justify-content-center">
            <h3>Wyszukaj restauracje w swojej miejscowości!</h3>
            <form onSubmit={sub}>
              <input
                type="text"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                className="form-control-lg m-2 text-center col-sm-8 col-lg-4"
              />
            </form>
          </div>
          <div className="text-center">
            <h4>Lista restauracji</h4>
            <div className="row row-cols-xs-1 row-cols-md-3 row-cols-lg-4 m-1">
              {restaurants}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Restaurants;
