import { useEffect } from "react";
import { useState } from "react";
import Loader from "../components/Loader";
import Restaurant from "../components/Restaurant";

const Restaurants = () => {
  const [data, setData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => {
    fetch("http://localhost:8080/Restaurant")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoaded(true);
      })
      .catch((error) => console.log(error));
  }, []);

  const restaurants = data.map((dat) => (
    <Restaurant key={dat.id} name={dat.name} image={dat.image} id={dat.id} />
  ));

  return (
    <div>
      {!isLoaded ? (
        <Loader />
      ) : (
        <section>
          <h2>Restauracje</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">{restaurants}</div>
        </section>
      )}
    </div>
  );
};

export default Restaurants;
