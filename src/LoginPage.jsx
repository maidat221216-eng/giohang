import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient"; // Import supabase client từ supabaseClient.js

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Lưu lỗi đăng nhập
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset lỗi trước khi bắt đầu đăng nhập

    try {
      // Đăng nhập với Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });

      if (error) {
        throw error; // Nếu có lỗi thì ném ra
      }

      // Lưu thông tin người dùng vào localStorage sau khi đăng nhập thành công
      localStorage.setItem(
        "user",
        JSON.stringify({ username: data.user.email, role: "user" })
      );
      alert("✅ Đăng nhập thành công!");
      navigate("/"); // Chuyển hướng sau khi đăng nhập thành công
    } catch (err) {
      console.error("Error logging in:", err.message);
      setError("❌ Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Đăng nhập vào tài khoản</h2>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Hiển thị lỗi nếu có */}
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Tên đăng nhập</label>
            <input
              type="text"
              placeholder="Nhập tên đăng nhập..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "⏳ Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
