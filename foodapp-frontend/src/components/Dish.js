const Dish = ({ add, product }) => {
  return (
    <div className="row">
      <div key={product.id} className="col-6">
        <h2>{product.name}</h2>
        <p>{product.price}PLN</p>
      </div>
      <div className="col">
        <button onClick={() => add(product)}>+</button>
      </div>
    </div>
  );
};

export default Dish;
