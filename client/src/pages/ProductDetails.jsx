import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import products from "../data/product";
import RelatedProducts from "../components/RelatedProducts";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div style={styles.notFound}>
        <h1>😢 Product Not Found</h1>
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
            src={product.image}
            alt={product.name}
            style={styles.image}
          />

          <button
            style={styles.cartBtn}
            onClick={() => addToCart(product)}
          >
            🛒 Add to Cart
          </button>

          <button
            style={styles.buyBtn}
            onClick={handleBuyNow}
          >
            ⚡ Buy Now
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
            <span style={styles.price}>
              ₹{product.price}
            </span>

            <span style={styles.oldPrice}>
              ₹{product.originalPrice}
            </span>

            <span style={styles.discount}>
              {product.discount}% OFF
            </span>
          </div>

          <p style={styles.stock}>
            ✅ In Stock ({product.stock} Left)
          </p>

          <h3>🎁 Available Offers</h3>

          <ul style={styles.offerList}>
            <li>💳 10% Instant Discount on Bank Cards</li>
            <li>🚚 Free Delivery Across India</li>
            <li>🔄 7 Days Easy Return</li>
            <li>⚡ No Cost EMI Available</li>
          </ul>

          <h3>Description</h3>

          <p style={styles.desc}>
            {product.description}
          </p>

          <div style={styles.infoBox}>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Warranty:</strong> 1 Year Manufacturer Warranty</p>
            <p><strong>Delivery:</strong> Delivery within 2-4 Days</p>
          </div>
        </div>
      </div>

      <div style={styles.relatedSection}>
        <RelatedProducts currentProductId={product.id} />
      </div>
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "40px",
    padding: "40px",
    background: "#f1f3f6",
    flexWrap: "wrap",
  },

  imageSection: {
    flex: 1,
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  },

  image: {
    width: "100%",
    maxWidth: "400px",
    height: "400px",
    objectFit: "contain",
  },

  info: {
    flex: 1,
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  },

  brand: {
    color: "#666",
    fontSize: "18px",
    marginTop: "10px",
  },

  rating: {
    color: "green",
    fontWeight: "bold",
    margin: "20px 0",
  },

  priceBox: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "20px",
  },

  price: {
    fontSize: "32px",
    fontWeight: "bold",
  },

  oldPrice: {
    textDecoration: "line-through",
    color: "#888",
  },

  discount: {
    color: "green",
    fontWeight: "bold",
  },

  stock: {
    color: "green",
    fontWeight: "bold",
    marginBottom: "20px",
  },

  offerList: {
    lineHeight: "2",
    marginBottom: "25px",
    color: "#333",
  },

  desc: {
    lineHeight: "1.8",
    color: "#555",
    marginTop: "10px",
  },

  infoBox: {
    marginTop: "25px",
    background: "#f8f8f8",
    padding: "20px",
    borderRadius: "8px",
    lineHeight: "2",
  },

  cartBtn: {
    width: "100%",
    padding: "15px",
    background: "#ff9f00",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "20px",
  },

  buyBtn: {
    width: "100%",
    padding: "15px",
    background: "#fb641b",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "15px",
  },

  relatedSection: {
    padding: "40px",
    background: "#f1f3f6",
  },

  notFound: {
    textAlign: "center",
    padding: "100px",
  },
};

export default ProductDetails;