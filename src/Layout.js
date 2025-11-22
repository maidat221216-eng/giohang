import "./assets/css/main.css";
import anhlogo from "./assets/images/hinh1.png";
import backgroundImage from "./assets/images/hinh2.jpg";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

// 1. Import giỏ hàng
import { useCart } from "./CartContext";

const Layout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 2. Lấy cartItems từ context
  const { cartItems } = useCart();

  // 3. Tính tổng số lượng sản phẩm
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="layout-wrapper">
      {/* Header */}
      <header className="header1">
        <div className="banner1">
          {/* LOGO */}
          <div className="logo1">
            <img src={anhlogo} width="260" alt="Logo" />
          </div>

          {/* MENU */}
          <div id="topleft">
            <ul className="ul1">
              <li>
                <a href="/">GAMES</a>
              </li>
              <li>
                <a href="/trang1">SHOP</a>
              </li>
              <li>
                <a href="/trang2">SUPPORT</a>
              </li>
              <li>
                <a href="/admin/products">QUẢN TRỊ</a>
              </li>
            </ul>
          </div>

          {/* USER / GIỎ HÀNG */}
          <div
            className="menubar-right"
            style={{ display: "flex", gap: "15px", alignItems: "center" }}
          >
            {/* Giỏ hàng */}
            <Link
              to="/cart"
              className="menu-item"
              style={{
                fontWeight: "bold",
                color: "#fff",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              🛒 Giỏ hàng
              {totalQuantity > 0 && (
                <span
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    fontSize: "12px",
                    marginLeft: "5px",
                  }}
                >
                  {totalQuantity}
                </span>
              )}
            </Link>

            {user ? (
              <>
                <span className="username">👤 {user.username}</span>
                <button className="logout-btn" onClick={handleLogout}>
                  Đăng xuất
                </button>
              </>
            ) : (
              <a href="/login" className="login-link">
                Đăng nhập
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="main-content">
        <div
          className="hero-bg"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          {location.pathname === "/" && (
            <iframe
              width="640"
              height="360"
              src="https://www.youtube.com/embed/E7kcUv_-n5c"
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="video-frame"
            ></iframe>
          )}
        </div>

        <div className="page-container">
          <Outlet />
        </div>
      </main>

      <footer className="footer">Footer</footer>
    </div>
  );
};

export default Layout;
