import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";

const Restaurant = ({ id, name, image }) => {
  return (
    <div key={id} className="col-sm-4 card">
      <LinkContainer to={`/restaurants/${id}`}>
        <Nav.Link>
          <div>
            <img
              src={`data:image/jpeg;base64,${image}`}
              className="rounded"
              alt={name}
            />
          </div>
          <h2>{name}</h2>
        </Nav.Link>
      </LinkContainer>
    </div>
  );
};

export default Restaurant;
