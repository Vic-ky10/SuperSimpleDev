import { useEffect, useState } from "react";
import PaymentSummary from "./PaymentSummary";
import "./checkout-header.css";
import "./CheckoutPage.css";

import { Link } from "react-router";
import axios from "axios";

import OrderSummary from "./OrderSummary";

function CheckoutPage({ cart, loadCart }) {
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [deliveryOptions, setDeliveryOptions] = useState([]);

  const loadPaymentSummary = async () => {
    const response = await axios.get("http://localhost:3000/api/payment-summary");
    setPaymentSummary(response.data);
  };

  const fetchCheckoutData = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime",
    );
    setDeliveryOptions(response.data);
    await loadPaymentSummary();
  };

  const updateDeliveryOption = async (productId, deliveryOptionId) => {
    await axios.put(`http://localhost:3000/api/cart-items/${productId}`, {
      deliveryOptionId,
    });
    await loadCart();
    await loadPaymentSummary();
  };

  useEffect(() => {
    document.title = "Checkout";
    fetchCheckoutData();
  }, []);
  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src="images/logo.png" />
              <img className="mobile-logo" src="images/mobile-logo.png" />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <Link className="return-to-home-link" to="/">
              {cart.length} items
            </Link>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
            updateDeliveryOption={updateDeliveryOption}
          />

          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
