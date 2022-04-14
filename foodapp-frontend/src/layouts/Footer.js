import { Container, Row } from "react-bootstrap";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
const Footer = () => {
  return (
    <footer className="bg-success text-white">
      <Container>
        <Row>
          <div className="d-flex justify-content-center p-5">
            <a className="mx-2" href="https://www.facebook.com/" target="blank">
              <BsFacebook size={40} color="white" />
            </a>
            <a
              className="mx-2"
              href="https://www.instagram.com/"
              target="blank"
            >
              <BsInstagram size={40} color="white" />
            </a>
            <a className="mx-2" href="https://twitter.com/" target="blank">
              <AiFillTwitterCircle size={40} color="white" />
            </a>
          </div>
          <hr></hr>
        </Row>
        <Row>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <h6>Created by: Krystian Włodarczyk</h6>
            <p>{new Date().getFullYear()}</p>
          </div>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
