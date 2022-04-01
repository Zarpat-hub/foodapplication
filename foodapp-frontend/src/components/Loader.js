import ClipLoader from "react-spinners/ClipLoader";
import { Container, Row } from "react-bootstrap";
import "../css/App.css";
const Loader = () => {
  return (
    <section>
      <Container className="d-flex align-items-center justify-content-center xxx">
        <Row>
          <ClipLoader />
        </Row>
      </Container>
    </section>
  );
};

export default Loader;
