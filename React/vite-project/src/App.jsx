import { Routes, Route } from "react-router";
import "./App.css";
import HomePage from "./Pages/Home/HomePage";
import CheckoutPage from "./Pages/CheckOut/CheckoutPage";
import OrderPage from "./Pages/Orders/OrderPage";
import TrackingPage from "./Pages/TrackingPage";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/cart-items?expand=product" );
      setCart(response.data);
    };

    fetchProductData();
  }, []);
  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} />} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
        <Route path="/orders" element={<OrderPage cart={cart} />} />
        <Route path="/tracking" element={<TrackingPage />} />
      </Routes>
    </>
  );
}

export default App;
