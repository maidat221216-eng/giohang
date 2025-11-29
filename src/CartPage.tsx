import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./assets/css/main.css";

export default function CartPage() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      const price = Number(item.product.price);
      const quantity = Number(item.quantity);
      if (!isNaN(price) && !isNaN(quantity) && price > 0 && quantity > 0) {
        total += price * quantity;
      }
    });
    setTotalPrice(total);
  }, [cartItems]);

  // ✅ Chuyển sang trang Checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h3>Giỏ hàng trống!</h3>
        <button onClick={() => navigate("/")} className="secondary-btn">
          ⬅ Quay lại mua sắm
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Giỏ hàng của bạn ({cartItems.length} sản phẩm)</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.product.id} className="cart-row">
              <td className="product-info">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="product-img"
                />
                <span className="product-name">{item.product.title}</span>
              </td>
              <td className="product-price">
                ${Number(item.product.price).toFixed(2)}
              </td>
              <td className="product-qty">
                <button
                  className="qty-btn"
                  onClick={() => decreaseQuantity(item.product.id)}
                >
                  -
                </button>
                <span className="qty-number">{item.quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => increaseQuantity(item.product.id)}
                >
                  +
                </button>
              </td>
              <td className="product-total">
                ${(item.product.price * item.quantity).toFixed(2)}
              </td>
              <td>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="remove-btn"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-footer">
        <button onClick={() => navigate("/")} className="secondary-btn">
          ⬅ Tiếp tục mua hàng
        </button>
        <div className="checkout">
          <h3>
            Tổng cộng:{" "}
            <span className="total-amount">${totalPrice.toFixed(2)}</span>
          </h3>
          <button className="primary-btn" onClick={handleCheckout}>
            Thanh toán ngay
          </button>
        </div>
      </div>
    </div>
  );
}
