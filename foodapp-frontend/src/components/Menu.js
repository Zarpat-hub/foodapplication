import Dish from "./Dish";
const Menu = ({ products, onAdd }) => {
  //console.log(props);
  return (
    <div>
      {products.map((e) => (
        <Dish
          key={e.id}
          name={e.name}
          price={e.price}
          add={onAdd}
          product={e}
        />
      ))}
    </div>
  );
};

export default Menu;
