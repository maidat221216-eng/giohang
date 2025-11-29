// src/App.tsx
import "./styles.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// --- CÁC COMPONENT ---
// @ts-ignore
import Layout from "./Layout";
// @ts-ignore
import ListProducts_SP from "./ListProducts_SP";
// @ts-ignore
import Trang1 from "./Trang1";
// @ts-ignore
import Trang2 from "./Trang2";
// @ts-ignore
import Chitietsanpham from "./Chitietsanpham";
// @ts-ignore
import LoginPage from "./LoginPage";
// @ts-ignore
import LogoutPage from "./LogoutPage";
// @ts-ignore
import ProtectedRoute from "./ProtectedRoute";
// @ts-ignore
import ListProducts_SP_Admin from "./ListProducts_SP_Admin";
// @ts-ignore
import EditProduct from "./EditProduct";

// @ts-ignore
import ChatPage from "./ChatPage";

// --- GIỎ HÀNG VÀ THANH TOÁN ---
// @ts-ignore
import { CartProvider } from "./CartContext";
// @ts-ignore
import CartPage from "./CartPage";
// @ts-ignore
import CheckoutPage from "./CheckoutPage";

export default function App() {
  return (
    // ✅ Bọc Provider ngoài cùng để state giỏ hàng sống toàn app
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Trang chủ hiển thị danh sách sản phẩm */}
            <Route index element={<ListProducts_SP />} />

            {/* Route Giỏ Hàng */}
            <Route path="cart" element={<CartPage />} />

            {/* Route Checkout */}
            <Route path="checkout" element={<CheckoutPage />} />

            {/* Route Chat */}
            <Route path="chat" element={<ChatPage />} />

            {/* Các trang khác */}
            <Route path="trang1" element={<Trang1 />} />
            <Route path="trang2" element={<Trang2 />} />

            {/* Route chi tiết sản phẩm */}
            <Route path="sanpham/:id" element={<Chitietsanpham />} />

            {/* Trang đăng nhập (giữ nguyên từ code 1) */}
            <Route path="login" element={<LoginPage />} />

            {/* Trang đăng xuất */}
            <Route path="logout" element={<LogoutPage />} />

            {/* Route Admin */}
            <Route path="/admin/edit/:id" element={<EditProduct />} />
            <Route
              path="admin/products"
              element={
                <ProtectedRoute>
                  <ListProducts_SP_Admin />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
