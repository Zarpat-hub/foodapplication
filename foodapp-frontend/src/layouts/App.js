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
import About from "../pages/About";
import Loginpage from "../pages/Loginpage";
import Registerpage from "../pages/Registerpage";

const App = () => {
  return (
    <Router>
      <Nav />
      <section className="min-vh-100">
        <Container>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/login" element={<Loginpage />} />
            <Route path="/restaurants/:name" element={<RestaurantPage />} />
            <Route path="/register" element={<Registerpage />} />
            <Route path="*" element={<Errorpage />} />
          </Routes>
        </Container>
      </section>
      <Footer />
    </Router>
  );
};

export default App;
