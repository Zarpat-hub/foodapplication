import Dish from "./Dish";
const Menu = ({ products, onAdd }) => {
  const numberOfDishes = products.length;

  return (
    <div>
      {numberOfDishes > 0
        ? products.map((e) => (
            <Dish
              key={e.id}
              name={e.name}
              price={e.price}
              add={onAdd}
              product={e}
            />
          ))
        : "Brak oferty"}
    </div>
  );
};

export default Menu;
