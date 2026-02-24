import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
import DeliveryOptions from "./DeliveryOptions";
import axios from "axios";

function OrderSummary({
  cart,
  deliveryOptions,
  updateDeliveryOption,
  loadCart,
  loadPaymentSummary,
}) {
  return (
    <>
      <div className="order-summary">
        {deliveryOptions.length > 0 &&
          cart.map((cartItem) => {
            const selectedDeliveryOption = deliveryOptions.find(
              (deliveryOption) => {
                return deliveryOption.id === cartItem.deliveryOptionId;
              },
            );

            const deleteCartItem = async () => {
              await axios.delete(
                `http://localhost:3000/api/cart-items/${cartItem.productId}`,
              );
              await loadCart();
              await loadPaymentSummary();
            };

            const deliveryDateText = selectedDeliveryOption
              ? dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",)
              : "Select delivery option";

            return (
              <div key={cartItem.productId} className="cart-item-container">
                <div className="delivery-date">
                  Delivery date: {deliveryDateText}
                </div>

                <div className="cart-item-details-grid">
                  <img
                    className="product-image"
                    src={cartItem.product.image}
                    alt={cartItem.product.name}
                  />

                  <div className="cart-item-details">
                    <div className="product-name">{cartItem.product.name}</div>
                    <div className="product-price">
                      ${formatMoney(cartItem.product.priceCents)}
                    </div>
                    <div className="product-quantity">
                      <span>
                        Quantity :{" "}
                        <span className="quantity-label">
                          {cartItem.quantity}
                        </span>
                      </span>
                      <span className="update-quantity-link link-primary">
                        Update
                      </span>
                      <span
                        className="delete-quantity-link link-primary"
                        onClick={deleteCartItem}
                      >
                        Delete
                      </span>
                    </div>
                  </div>

                  <DeliveryOptions
                    deliveryOptions={deliveryOptions}
                    cartItem={cartItem}
                    updateDeliveryOption={updateDeliveryOption}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default OrderSummary;
