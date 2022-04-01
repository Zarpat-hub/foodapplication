import { Container, Row } from "react-bootstrap";
import { BsFacebook, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-dark text-white">
      <Container>
        <Row>
          <div className="d-flex justify-content-center p-5">
            <a className="mx-2" href="#!" target="_blank">
              <BsFacebook size={35} color="white" />
            </a>
            <a className="mx-2" href="#!" target="_blank">
              <BsInstagram size={35} color="pink" />
            </a>
            <a className="mx-2" href="#!" target="_blank">
              <BsFacebook size={35} />
            </a>
          </div>
          <hr></hr>
        </Row>
        <Row>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <h6>Created by: loremIpsum</h6>
            <p>{new Date().getFullYear()}</p>
          </div>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
