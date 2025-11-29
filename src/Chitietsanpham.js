// chitietsanpham.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { useCart } from "./CartContext";

export default function Chitietsanpham() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .eq("id", Number(id))
          .single();
        if (error) throw error;
        setProduct(data);
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p>Đang tải sản phẩm...</p>;
  if (!product) return <p>Không tìm thấy sản phẩm.</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "1rem" }}>
        ⬅ Quay lại
      </button>

      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 300px" }}>
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </div>

        <div style={{ flex: "1 1 300px" }}>
          <h2>{product.title}</h2>
          <p
            style={{ color: "#e63946", fontWeight: "bold", fontSize: "1.5rem" }}
          >
            ${product.price}
          </p>
          <p>
            ⭐ {product.rating_rate} | ({product.rating_count} đánh giá)
          </p>
          <p>{product.description}</p>

          <button
            onClick={() => {
              addToCart(product);
              alert(`Đã thêm "${product.title}" vào giỏ hàng!`);
            }}
            style={{
              padding: "12px 24px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              marginTop: "1rem",
              fontWeight: "600",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#0056b3")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#007bff")
            }
          >
            🛒 Thêm vào giỏ
          </button>

          {/* Nút mở video trên tab mới */}
          {product.video_url && (
            <div style={{ marginTop: "1rem" }}>
              <button
                onClick={() => window.open(product.video_url, "_blank")}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#e63946",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginTop: "1rem",
                }}
              >
                Xem video sản phẩm
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
