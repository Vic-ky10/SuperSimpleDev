import { Routes, Route } from "react-router";
import "./App.css";
import HomePage from "./Pages/HomePage";
import CheckoutPage from "./Pages/CheckoutPage";
import OrderPage from "./Pages/OrderPage";
import TrackingPage from "./Pages/TrackingPage";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/tracking" element ={<TrackingPage />} />
      </Routes>
    </>
  );
}

export default App;
