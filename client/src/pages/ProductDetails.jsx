import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
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
            src={`http://localhost:5000${product.image}`}
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
  },
  brand: {
    color: "#666",
    marginTop: "10px",
  },
  rating: {
    color: "green",
    margin: "20px 0",
  },
  priceBox: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    marginBottom: "20px",
  },
  price: {
    fontSize: "30px",
    fontWeight: "bold",
  },
  oldPrice: {
    textDecoration: "line-through",
    color: "#777",
  },
  discount: {
    color: "green",
  },
  stock: {
    color: "green",
    marginBottom: "20px",
  },
  desc: {
    lineHeight: "1.8",
  },
  cartBtn: {
    width: "100%",
    padding: "15px",
    background: "#ff9f00",
    color: "#fff",
    border: "none",
    marginTop: "20px",
    cursor: "pointer",
  },
  buyBtn: {
    width: "100%",
    padding: "15px",
    background: "#fb641b",
    color: "#fff",
    border: "none",
    marginTop: "10px",
    cursor: "pointer",
  },
  notFound: {
    textAlign: "center",
    padding: "100px",
  },
};

export default ProductDetails;