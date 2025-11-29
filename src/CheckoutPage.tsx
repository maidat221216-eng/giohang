// src/CheckoutPage.tsx
import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./assets/css/main.css";

interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleConfirmPayment = () => {
    if (
      !customer.name ||
      !customer.email ||
      !customer.phone ||
      !customer.address
    ) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    alert(
      `Thanh toán thành công!\nTổng: $${totalPrice.toFixed(2)}\nTên: ${
        customer.name
      }\nĐịa chỉ: ${customer.address}`
    );
    clearCart();
    navigate("/");
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
    <div
      className="checkout-page"
      style={{ display: "flex", gap: "2rem", padding: "1rem" }}
    >
      {/* Bên trái: Form thông tin khách hàng */}
      <div className="checkout-form" style={{ flex: 1 }}>
        <h2>Thông tin khách hàng</h2>
        <div className="form-group">
          <label>Họ và tên</label>
          <input
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            placeholder="Nhập họ tên"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            placeholder="Nhập email"
          />
        </div>
        <div className="form-group">
          <label>Số điện thoại</label>
          <input
            type="tel"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            placeholder="Nhập số điện thoại"
          />
        </div>
        <div className="form-group">
          <label>Địa chỉ</label>
          <textarea
            name="address"
            value={customer.address}
            onChange={handleChange}
            placeholder="Nhập địa chỉ"
          />
        </div>
        <button className="primary-btn" onClick={handleConfirmPayment}>
          Xác nhận thanh toán
        </button>
      </div>

      {/* Bên phải: Danh sách sản phẩm + tổng tiền */}
      <div
        className="checkout-summary"
        style={{
          flex: 1,
          border: "1px solid #ddd",
          padding: "1rem",
          height: "fit-content",
        }}
      >
        <h2>Đơn hàng</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cartItems.map((item) => (
            <li key={item.product.id} style={{ marginBottom: "1rem" }}>
              {item.product.title} x {item.quantity} = $
              {(item.product.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <h3>
          Tổng cộng: <span>${totalPrice.toFixed(2)}</span>
        </h3>
      </div>
    </div>
  );
}
