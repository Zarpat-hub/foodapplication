import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const AddRestaurant = () => {
  const [Name, setName] = useState("");
  const [File, setFile] = useState(null);
  const [CitiesIDs, setCity] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleFile = (e) => {
    let File = e.target.files[0];
    setFile(File);
  };

  useEffect(() => {
    fetch(`http://localhost:8080/City`)
      .then((res) => res.json())
      .then((city) => {
        setCities(city);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleCheckBox = (e) => {
    const tmp = [...CitiesIDs];
    tmp.push(parseInt(e.target.id));
    setCity(tmp);
    console.log(CitiesIDs);
  };

  const cityCheckbox = cities.map((dat) => (
    <label className="p-2" key={dat.id}>
      {dat.name}
      <input type="checkbox" id={dat.id} onChange={handleCheckBox} />
    </label>
  ));

  const submit = (e) => {
    e.preventDefault();
    console.log(File);
    console.log(Name);
    console.log(CitiesIDs);

    const url = "http://localhost:8080/Restaurant";

    let formData = new FormData();
    formData.append("Name", Name);
    formData.append("File", File);
    for (let i = 0; i < CitiesIDs.length; i++) {
      formData.append("CitiesIDs", CitiesIDs[i]);
    }

    axios
      .post(url, formData)
      .then((res) => {
        console.log(res);
        setError(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <section>
      <section className="vh-100">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card">
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">
                      Dodaj restaurację
                    </h2>

                    <form onSubmit={submit}>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          onChange={handleName}
                          id="form3Example3cg"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="form3Example3cg">
                          Nazwa Restauracji
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="file"
                          id="form3Example4cg"
                          onChange={handleFile}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="form3Example4cg">
                          Dodaj zdjęcie
                        </label>
                      </div>
                      <p>Wybierz miejscowości</p>
                      {cityCheckbox}
                      <div className="d-flex justify-content-center">
                        <input
                          type="submit"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 "
                          value="Dodaj"
                          required
                        />
                      </div>
                      {error ? "Dodano" : ""}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default AddRestaurant;
