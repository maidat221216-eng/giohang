import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import crypto from "crypto-js";
import anhlogo1 from "./assets/images/keylogin.png";
import "./assets/css/login.css";

const LoginPage = () => {
  // State quản lý chế độ (Đăng nhập/Đăng ký)
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // --- HÀM XỬ LÝ ĐĂNG NHẬP (Giữ nguyên logic của bạn) ---

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // 1. Lấy user theo email trong tbl_user

    const { data: users, error } = await supabase
      .from("tbl_user")
      .select("*")
      .eq("email", email)
      .limit(1);

    if (!users || users.length === 0) {
      alert("❌ Email không tồn tại!");
      setLoading(false);
      return;
    }

    const user = users[0]; // 2. Hash mật khẩu nhập vào bằng SHA-256

    const inputHash = crypto.SHA256(password).toString();

    if (inputHash !== user.password_hash) {
      alert("❌ Mật khẩu sai!");
      setLoading(false);
      return;
    } // 3. Lưu user vào localStorage

    localStorage.setItem(
      "user",
      JSON.stringify({
        id: user.id,
        username: user.username,
        role: user.role,
      })
    ); // 4. Điều hướng theo role

    if (user.role === 1) {
      alert("✅ Đăng nhập Admin thành công!");
      navigate("/admin/products");
    } else {
      alert("✅ Đăng nhập thành công!");
      navigate("/");
    }

    setLoading(false); // Reset form
    setEmail("");
    setPassword("");
  }; // --- HÀM XỬ LÝ ĐĂNG KÝ (Lấy logic từ RegisterPage) ---

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // 1. Kiểm tra email đã tồn tại chưa

    const { data: existingUser, error: checkError } = await supabase
      .from("tbl_user")
      .select("email")
      .eq("email", email)
      .limit(1);

    if (existingUser && existingUser.length > 0) {
      alert("❌ Email đã tồn tại!");
      setLoading(false);
      return;
    } // 2. Hash mật khẩu

    const passwordHash = crypto.SHA256(password).toString(); // 3. Insert vào Supabase

    const { error } = await supabase.from("tbl_user").insert([
      {
        username: username,
        email: email,
        password_hash: passwordHash,
        role: 0, // user bình thường
      },
    ]);

    if (error) {
      alert("❌ Lỗi đăng ký: " + error.message);
      setLoading(false);
      return;
    }

    alert("🎉 Đăng ký thành công! Hãy đăng nhập.");
    setIsRegisterMode(false); // Chuyển về chế độ Đăng nhập

    setLoading(false); // Reset form
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = isRegisterMode ? handleRegister : handleLogin;

  return (
    <div className="login-wrapper">
           {" "}
      <div className="login-card">
                <img src={anhlogo1} alt="logo" className="login-logo" />       {" "}
        {/* Header Tabs */}       {" "}
        <div className="auth-tabs">
                   {" "}
          <div
            className={`auth-tab ${!isRegisterMode ? "active" : ""}`}
            onClick={() => setIsRegisterMode(false)}
          >
                     ĐĂNG NHẬP          {" "}
          </div>
                   {" "}
          <div
            className={`auth-tab ${isRegisterMode ? "active" : ""}`}
            onClick={() => setIsRegisterMode(true)}
          >
                        ĐĂNG KÝ          {" "}
          </div>
                 {" "}
        </div>
               {" "}
        <form onSubmit={handleSubmit} className="login-form">
                    {/* Trường Tên người dùng chỉ hiện khi Đăng ký */}         {" "}
          {isRegisterMode && (
            <>
                            <label>Tên người dùng</label>
                           {" "}
              <input
                type="text"
                placeholder="Nhập username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={isRegisterMode} // Yêu cầu khi Đăng ký
              />
                         {" "}
            </>
          )}
                    <label>Email</label>
                   {" "}
          <input
            type="email"
            placeholder="Nhập email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
                    <label>Mật khẩu</label>
                   {" "}
          <input
            type="password"
            placeholder="Nhập mật khẩu..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
                   {" "}
          <button type="submit" disabled={loading}>
                       {" "}
            {loading
              ? isRegisterMode
                ? "Đang đăng ký..."
                : "Đang đăng nhập..."
              : isRegisterMode
              ? "Đăng ký"
              : "Đăng nhập"}
                     {" "}
          </button>
                             {" "}
          {!isRegisterMode && (
            <a href="#" className="forgot-password">
              QUÊN MẬT KHẨU?
            </a>
          )}
                 {" "}
        </form>
        {/* Social Login Buttons (chỉ hiện khi Đăng nhập) */}
        {!isRegisterMode && (
          <>
            <button className="social-login-btn google-btn">
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="Google"
              />{" "}
              ĐĂNG NHẬP GOOGLE
            </button>
            <button className="social-login-btn facebook-btn">
              <img
                src="https://img.icons8.com/fluency/16/000000/facebook-new.png"
                alt="Facebook"
              />{" "}
              ĐĂNG NHẬP FACEBOOK
            </button>
          </>
        )}
             {" "}
      </div>
         {" "}
    </div>
  );
};

export default LoginPage;