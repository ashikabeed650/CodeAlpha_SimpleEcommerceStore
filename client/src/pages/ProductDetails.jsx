import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api, { API_ORIGIN } from "../api/api";
import { useCart } from "../context/CartContext";
import RelatedProducts from "../components/RelatedProducts";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div style={styles.notFound}>
        <h2>Loading...</h2>
      </div>
    );
  }

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.imageSection}>
          <img
            src={`${API_ORIGIN}${product.image}`}
            alt={product.name}
            style={styles.image}
          />

          <button
            style={styles.cartBtn}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

          <button
            style={styles.buyBtn}
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>

        <div style={styles.info}>
          <h1>{product.name}</h1>

          <p style={styles.brand}>
            Brand: {product.brand}
          </p>

          <div style={styles.rating}>
            ⭐ {product.rating} ({product.reviews} Reviews)
          </div>

          <div style={styles.priceBox}>
            <span style={styles.price}>₹{product.price}</span>

            <span style={styles.oldPrice}>
              ₹{product.originalPrice}
            </span>

            <span style={styles.discount}>
              {product.discount}% OFF
            </span>
          </div>

          <p style={styles.stock}>
            In Stock ({product.stock})
          </p>

          <h3>Description</h3>

          <p style={styles.desc}>
            {product.description}
          </p>
        </div>
      </div>

      <RelatedProducts currentProductId={product._id} />
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "32px",
    padding: "32px",
    background: "transparent",
    flexWrap: "wrap",
  },
  imageSection: {
    flex: "1 1 360px",
    background: "var(--card-bg)",
    padding: "20px",
    borderRadius: "12px",
  },
  image: {
    width: "100%",
    maxWidth: "480px",
    height: "420px",
    objectFit: "contain",
  },
  info: {
    flex: "1 1 420px",
    background: "var(--card-bg)",
    padding: "22px",
    borderRadius: "12px",
    textAlign: "left",
  },
  brand: {
    color: "#666",
    marginTop: "8px",
    fontSize: "14px",
  },
  rating: {
    color: "#0f9d58",
    margin: "14px 0",
    fontWeight: "700",
  },
  priceBox: {
    display: "flex",
    gap: "12px",
    alignItems: "baseline",
    marginBottom: "16px",
  },
  price: {
    fontSize: "28px",
    fontWeight: "800",
    color: "var(--primary)",
  },
  oldPrice: {
    textDecoration: "line-through",
    color: "#999",
    fontSize: "14px",
  },
  discount: {
    color: "var(--accent)",
    fontWeight: "700",
  },
  stock: {
    color: "#4caf50",
    marginBottom: "16px",
  },
  desc: {
    lineHeight: "1.8",
    color: "#555",
  },
  cartBtn: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(90deg, var(--cta), var(--accent))",
    color: "#fff",
    border: "none",
    marginTop: "18px",
    cursor: "pointer",
    borderRadius: "8px",
    fontWeight: "700",
  },
  buyBtn: {
    width: "100%",
    padding: "12px",
    background: "transparent",
    color: "var(--primary)",
    border: "2px solid var(--primary)",
    marginTop: "10px",
    cursor: "pointer",
    borderRadius: "8px",
    fontWeight: "700",
  },
  notFound: {
    textAlign: "center",
    padding: "100px",
  },
};

export default ProductDetails;