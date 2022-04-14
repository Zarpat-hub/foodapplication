import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";

const Restaurant = ({ id, name, image }) => {
  return (
    <div key={id} className="card col-md-4 mb-3 mt-3">
      <LinkContainer to={`/restaurants/${id}`}>
        <Nav.Link>
          <img
            src={`data:image/jpeg;base64,${image}`}
            className="rounded card-img-top"
            alt={name}
          />
          <div className="card-body d-flex justify-content-center">
            <h2>{name}</h2>
          </div>
        </Nav.Link>
      </LinkContainer>
    </div>
  );
};

export default Restaurant;
