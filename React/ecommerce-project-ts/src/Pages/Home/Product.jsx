import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { formatMoney } from "../../utils/money";

function Product({ product, loadCart }) {
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const addedMessageTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (addedMessageTimeoutRef.current) {
        clearTimeout(addedMessageTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="product-container">
        <div className="product-image-container">
          <img
            className="product-image"
            src={
              product.image.startsWith("http")
                ? product.image
                : `/${product.image.replace(/^\/+/, "")}`
            }
            alt={product.name}
          />
        </div>

        <div className="product-name limit-text-to-2-lines">{product.name}</div>

        <div className="product-rating-container">
          <img
            className="product-rating-stars"
            src={`/images/ratings/rating-${product.rating.stars * 10}.png`}
            alt={`Rating ${product.rating.stars} out of 5`}
          />
          <div className="product-rating-count link-primary">
            {product.rating.count}
          </div>
        </div>

        <div className="product-price">{formatMoney(product.priceCents)}</div>

        <div className="product-quantity-container">
          <select
            value={quantity}
            onChange={(event) => {
              const selectedQuantity = Number(event.target.value);
              setQuantity(selectedQuantity);
            }}
          >
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>
             <option value="4">4</option>
             <option value="5">5</option>
             <option value="6">6</option>
             <option value="7">7</option>
             <option value="8">8</option>
             <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div className="product-spacer"></div>

        <div className={`added-to-cart ${showAddedMessage ? "visible" : ""}`}>
          <img src="/images/icons/checkmark.png" alt="added" />
          Added
        </div>

        <p className="para"></p>

        <button
          className="add-to-cart-button button-primary"
          onClick={async () => {
            await axios.post("http://localhost:3000/api/cart-items", {
              productId: product.id,
              quantity: quantity,
            });
            await loadCart();

            setShowAddedMessage(true);
            if (addedMessageTimeoutRef.current) {
              clearTimeout(addedMessageTimeoutRef.current);
            }
            addedMessageTimeoutRef.current = setTimeout(() => {
              setShowAddedMessage(false);
            }, 2000);
          }}
        >
          Add to Cart
        </button>
      </div>
    </>
  );
}

export default Product;

