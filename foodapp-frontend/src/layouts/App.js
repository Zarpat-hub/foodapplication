import "../css/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";

//layout
import Nav from "./Nav";
import Footer from "./Footer";

//pages
import Homepage from "../pages/Homepage";
import Restaurants from "../pages/Restaurants";
import RestaurantPage from "../pages/RestaurantPage";
import Errorpage from "../pages/Errorpage";
import Loginpage from "../pages/Loginpage";
import Registerpage from "../pages/Registerpage";
import RegisterpageOwner from "../pages/RegisterpageOwner";
import { useState } from "react";
import { LoginContext, User } from "../context/LoginContext";
import AddRestaurantPage from "../pages/AddRestaurantPage";
import ProfilePage from "../pages/ProfilePage";
import Order from "../pages/Order";
import MyRestaurants from "../pages/MyRestaurants";
import ManagmentPage from "../pages/ManagmentPage";
import WorkerPage from "../pages/WorkerPage";

const App = () => {
  const [name, setName] = useState(User.name);
  const [role, setRole] = useState(User.role);
  const [email, setEmail] = useState(User.email);
  const [id, setID] = useState(User.id);
  const [token, setToken] = useState(User.token);
  const CheckLogin = async () => {
    const res = await fetch("http://localhost:8080/User/claims", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const x = await res.json();
    setID(x[0].value);
    setName(x[1].value);
    setEmail(x[2].value);
    setRole(x[3].value);
    setToken(x[4].value);
    console.log("TEST");

    if (role === "Worker") {
      console.log("App.js worker account");
    }
  };

  CheckLogin();

  return (
    <Router>
      <LoginContext.Provider
        value={{
          name,
          role,
          email,
          id,
          token,
          setToken,
          setID,
          setEmail,
          setName,
          setRole,
        }}
      >
        <Nav />
        <section className="min-vh-100">
          <Container>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/restaurants" element={<Restaurants />} />
              <Route path="/login" element={<Loginpage />} />
              <Route path="/restaurants/:name" element={<RestaurantPage />} />
              <Route path="/management/:name" element={<ManagmentPage />} />
              <Route path="/register" element={<Registerpage />} />
              <Route path="/registerowner" element={<RegisterpageOwner />} />
              <Route path="/addRestaurant" element={<AddRestaurantPage />} />
              <Route path="/myrestaurants" element={<MyRestaurants />} />
              <Route path="/order" element={<Order />} />
              <Route path="/workerpage" element={<WorkerPage />} />
              <Route path="*" element={<Errorpage />} />
            </Routes>
          </Container>
        </section>
        <Footer />
      </LoginContext.Provider>
    </Router>
  );
};

export default App;
