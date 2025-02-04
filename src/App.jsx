import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Meals from "../src/Components/Meals/Meals";
import MealDetails from "../src/Components/MealDetails/MealDetails";
import Navbar from "../src/Components/Navbar/Navbar"


function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Meals />} />
          <Route path="/meal/:id" element={<MealDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;