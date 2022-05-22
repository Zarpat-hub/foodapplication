const Dish = ({ add, product }) => {
  return (
    <div className="row card p-2 mt-2">
      <div key={product.id} className=" d-flex justify-content-between">
        <h2>{product.name}</h2>

        <button
          className="btn btn-success btn-block"
          onClick={() => add(product)}
        >
          +
        </button>
      </div>
      <div className="col">
        <p>Cena: {product.price}PLN</p>
      </div>
    </div>
  );
};

export default Dish;
