import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";
import FoodDetailPage from "./pages/FoodDetailPage.jsx";
import FoodListPage from "./pages/FoodListPage.jsx";
import ReviewFoodPage from "./pages/ReviewFoodPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<FoodListPage />} />
        <Route path="/foods/:code" element={<FoodDetailPage />} />
        <Route path="/review-food" element={<ReviewFoodPage />} />
      </Route>
    </Routes>
  );
}
