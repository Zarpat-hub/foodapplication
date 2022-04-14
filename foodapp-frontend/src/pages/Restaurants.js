import { useEffect } from "react";
import { useState } from "react";
import Loader from "../components/Loader";
import Restaurant from "../components/Restaurant";

const Restaurants = () => {
  const [data, setData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [city, setCity] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/Restaurant")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoaded(true);
      })
      .catch((error) => console.log(error));
  }, []);

  const restaurants = data.map((dat) => (
    <Restaurant key={dat.id} name={dat.name} image={dat.image} id={dat.id} />
  ));

  const search = (e) => {
    console.log(e.target.value);
    setCity(e.target.value);
  };

  return (
    <div>
      {!isLoaded ? (
        <Loader />
      ) : (
        <section>
          <div className="row p-5 text-center d-flex justify-content-center">
            <h3>Wyszukaj restauracje w swojej miejscowości!</h3>

            <input
              type="text"
              onChange={search}
              value={city}
              className="form-control-lg m-2 text-center col-sm-8 col-lg-4"
            />
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
