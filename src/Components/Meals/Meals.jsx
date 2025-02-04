import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchTerm)
      .then((response) => response.json())
      .then((data) => setMeals(data.meals || []));
  }, [searchTerm]);

  return (
    <div className="container mx-auto p-4 mr-20">
      <h1 className="text-3xl font-bold mb-4 text-center">Learn, Cook, Eat Your Food</h1>
      <input
        type="text"
        placeholder="Search for a meal..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-6 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {meals.map((meal) => (
          <div
            key={meal.idMeal}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white relative hover:scale-110 transform hover:z-10" // أضفت hover:scale-110 هنا
          >
            {/* صورة نصفها فوق البطاقة */}
            <div className="flex justify-center ">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-48 h-48 rounded-full object-cover transform transition-transform duration-500 ease-in-out hover:rotate-[360deg]"
              />
            </div>
            {/* محتوى البطاقة */}
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold mb-2">{meal.strMeal}</h2>
              <button
                onClick={() => navigate(`/meal/${meal.idMeal}`)}
                className="rounded-full px-4 py-2 bg-green-500 text-white hover:bg-green-600 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Meals;