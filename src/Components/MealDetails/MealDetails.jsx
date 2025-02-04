import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MealDetails = () => {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then((response) => response.json())
            .then((data) => setMeal(data.meals ? data.meals[0] : null));
    }, [id]);

    if (!meal) return <p className="text-center text-xl font-semibold mt-20">Loading...</p>;

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`] && meal[`strMeasure${i}`]) {
            ingredients.push(`${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}`);
        }
    }

    const openYouTubeVideo = () => {
        if (meal.strYoutube) {
            window.open(meal.strYoutube, "_blank");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg max-w-5xl mx-auto overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col  h-full md:p-6">
                        <div
                            className="h-96 bg-cover bg-center rounded-lg mb-4"
                            style={{
                                backgroundImage: `url(${meal.strMealThumb})`,
                            }}
                        >

                        </div>

                        {meal.strYoutube && (
                            <button
                                onClick={openYouTubeVideo}
                                className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                            >
                                Go to YouTube
                            </button>
                        )}
                    </div>

                    <div className="p-6 space-y-8">
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Ingredients:</h2>
                            <ul className="list-disc pl-8 space-y-2">
                                {ingredients.map((ingredient, index) => (
                                    <li key={index} className="text-black">
                                        {ingredient}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Instructions:</h2>
                            <p className="text-black text-[14px]">{meal.strInstructions}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealDetails;