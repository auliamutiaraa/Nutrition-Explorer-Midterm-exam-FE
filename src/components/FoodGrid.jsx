import FoodCard from "./FoodCard.jsx";

export default function FoodGrid({ foods }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {foods.map((food) => (
        <FoodCard key={food.code} food={food} />
      ))}
    </div>
  );
}
