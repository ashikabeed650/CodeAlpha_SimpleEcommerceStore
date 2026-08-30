import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import ProductCard from "../components/ProductCard";
import "../components/Stats.css";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={styles.page}>
      {/* Hero */}
      <div style={styles.banner} className="hero-banner">
        <div>
          <h1 style={styles.title} className="hero-title">🛍 Welcome to ShopEasy</h1>

          <p style={styles.subtitle} className="hero-subtitle">
            India's Smart Online Shopping Destination
          </p>

          <Link to="/products">
            <button style={styles.shopBtn} className="cta-btn">
              Shop Now →
            </button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <section className="stats-section">
        <div className="stat-card">
          <h2 className="stat-number">500+</h2>
          <p className="stat-label">Products</p>
        </div>

        <div className="stat-card">
          <h2 className="stat-number">10K+</h2>
          <p className="stat-label">Happy Customers</p>
        </div>

        <div className="stat-card">
          <h2 className="stat-number">24/7</h2>
          <p className="stat-label">Support</p>
        </div>

        <div className="stat-card">
          <h2 className="stat-number">100%</h2>
          <p className="stat-label">Secure Payment</p>
        </div>
      </section>

      {/* Categories */}
      <section style={styles.section}>
        <h2>Shop by Category</h2>

        <div style={styles.categories}>
          <a href="/products?category=Mobiles" style={styles.categoryCard} className="category-card">
            <img src="http://localhost:5000/images/mobiles.jpg" alt="Mobiles" style={styles.catImage} />
            <div style={styles.catLabel}>Mobiles</div>
          </a>

          <a href="/products?category=Electronics" style={styles.categoryCard} className="category-card">
            <img src="http://localhost:5000/images/electronics.jpg" alt="Electronics" style={styles.catImage} />
            <div style={styles.catLabel}>Electronics</div>
          </a>

          <a href="/products?category=Watches" style={styles.categoryCard} className="category-card">
            <img src="http://localhost:5000/images/watches.jpg" alt="Watches" style={styles.catImage} />
            <div style={styles.catLabel}>Watches</div>
          </a>

          <a href="/products?category=Accessories" style={styles.categoryCard} className="category-card">
            <img src="http://localhost:5000/images/accessories.jpg" alt="Accessories" style={styles.catImage} />
            <div style={styles.catLabel}>Accessories</div>
          </a>
        </div>
      </section>

      {/* Featured Products */}
      <section style={styles.section}>
        <h2>Featured Products</h2>

        <div style={styles.grid}>
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </section>

      {/* Deals */}
      <section style={styles.section}>
        <h2>Today's Deals</h2>

        <div style={styles.deals}>
          <div style={styles.dealCard}>
            <h3>🔥 Up to 60% OFF</h3>
            <p>Electronics Collection</p>
          </div>

          <div style={styles.dealCard}>
            <h3>🎁 Buy 1 Get 1</h3>
            <p>Accessories</p>
          </div>

          <div style={styles.dealCard}>
            <h3>⚡ Flash Sale</h3>
            <p>Limited Time Offers</p>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section style={styles.section}>
        <h2>Why Choose ShopEasy?</h2>

        <div style={styles.features}>
          <div style={styles.feature}>
            🚚
            <h3>Fast Delivery</h3>
            <p>Delivered within 2-4 days.</p>
          </div>

          <div style={styles.feature}>
            🔒
            <h3>Secure Payment</h3>
            <p>100% Safe Transactions.</p>
          </div>

          <div style={styles.feature}>
            🔄
            <h3>Easy Returns</h3>
            <p>7 Days Return Policy.</p>
          </div>

          <div style={styles.feature}>
            ⭐
            <h3>Top Quality</h3>
            <p>Trusted Brands Only.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <h2>ShopEasy</h2>

        <p>Your One Stop Online Shopping Store.</p>

        <p>About | Contact | Privacy Policy</p>

        <p>© 2026 ShopEasy. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    background: "#f1f3f6",
  },

  banner: {
    height: "520px",
    background: "linear-gradient(135deg,#2874f0,#0f52ba)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textAlign: "center",
    padding: "40px 20px",
  },

  title: {
    fontSize: "64px",
    marginBottom: "12px",
    fontWeight: 800,
    lineHeight: 1.05,
    maxWidth: "1000px",
    textShadow: "0 8px 26px rgba(11,40,90,0.18)",
    letterSpacing: "-.6px",
  },

  subtitle: {
    fontSize: "20px",
    opacity: 0.95,
    marginTop: "6px",
    fontWeight: 500,
    marginBottom: "8px",
  },


  shopBtn: {
    marginTop: "30px",
    padding: "14px 36px",
    background: "#fb641b",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "10px",
    fontSize: "18px",
    fontWeight: 800,
    boxShadow: "0 8px 24px rgba(91, 39, 8, 0.18)",
  },

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gap: "20px",
    padding: "40px",
  },

  stat: {
    background: "#fff",
    textAlign: "center",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 3px 10px rgba(0,0,0,.1)",
  },

  section: {
    padding: "40px",
  },

  categories: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
    gap: "18px",
    marginTop: "20px",
    alignItems: "stretch",
  },

  categoryCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--card-bg)",
    padding: "12px",
    textAlign: "center",
    borderRadius: "12px",
    boxShadow: "var(--shadow)",
    textDecoration: "none",
    color: "var(--muted)",
    minHeight: "160px",
  },

  catImage: {
    width: "100%",
    maxWidth: "120px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "12px",
  },

  catLabel: {
    fontSize: "16px",
    fontWeight: "700",
    color: "var(--primary)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "25px",
    marginTop: "20px",
  },

  deals: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  dealCard: {
    background: "#367beb",
    color: "#fff",
    textAlign: "center",
    padding: "30px",
    borderRadius: "10px",
  },

  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginTop: "25px",
  },

  feature: {
    background: "#fff",
    padding: "30px",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "0 3px 10px rgba(0,0,0,.1)",
  },

  footer: {
    background: "#172337",
    color: "#fff",
    textAlign: "center",
    padding: "40px",
    marginTop: "40px",
  },
};

export default Home;