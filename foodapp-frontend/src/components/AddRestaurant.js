import { useState } from "react";
import axios from "axios";

const AddRestaurant = () => {
  const [data, setData] = useState("");
  const [file, setFile] = useState(null);

  const handleName = (e) => {
    setData(e.target.value);
  };

  const handleFile = (e) => {
    let file = e.target.files[0];
    setFile(file);
  };

  const submit = (e) => {
    e.preventDefault();
    const url = "http://localhost:8080/Restaurant";

    let formData = new FormData();
    formData.append("name", data);
    formData.append("File", file);

    axios.post(url, formData);
  };
  return (
    <section>
      <h5>Dodaj restaurację</h5>
      <form onSubmit={submit}>
        <input onChange={handleName} type="text"></input>
        <input onChange={handleFile} type="file"></input>
        <input type="submit" value="Add"></input>
      </form>
    </section>
  );
};

export default AddRestaurant;
