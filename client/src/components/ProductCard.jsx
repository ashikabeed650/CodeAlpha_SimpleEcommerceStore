import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div style={styles.card}>
      <div style={styles.discount}>
        {product.discount}% OFF
      </div>

      <Link
        to={`/products/${product._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img
          src={`http://localhost:5000${product.image}`}
          alt={product.name}
          style={styles.image}
        />

        <p style={styles.brand}>{product.brand}</p>

        <h3 style={styles.name}>{product.name}</h3>
      </Link>

      <div style={styles.rating}>
        ⭐ {product.rating}
        <span style={styles.reviews}>
          ({product.reviews} Reviews)
        </span>
      </div>

      <div style={styles.priceBox}>
        <span style={styles.price}>₹{product.price}</span>

        <span style={styles.oldPrice}>
          ₹{product.originalPrice}
        </span>
      </div>

      <p style={styles.delivery}>✓ Free Delivery</p>

      <button
        style={styles.button}
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

const styles = {
  card: {
    position: "relative",
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
    cursor: "pointer",
  },

  discount: {
    position: "absolute",
    top: "10px",
    left: "10px",
    background: "#388e3c",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "contain",
    marginBottom: "15px",
  },

  brand: {
    color: "#666",
    fontSize: "14px",
  },

  name: {
    fontSize: "18px",
    margin: "8px 0",
    minHeight: "45px",
  },

  rating: {
    color: "#388e3c",
    fontWeight: "bold",
    marginBottom: "10px",
  },

  reviews: {
    color: "#666",
    marginLeft: "5px",
  },

  priceBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  },

  price: {
    fontSize: "22px",
    fontWeight: "bold",
  },

  oldPrice: {
    color: "#888",
    textDecoration: "line-through",
  },

  delivery: {
    color: "#388e3c",
    fontWeight: "bold",
    marginBottom: "15px",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#fb641b",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default ProductCard;