import { Link } from "react-router-dom";
import products from "../data/product";
import ProductCard from "../components/ProductCard";

function Home() {
  return (
    <div style={styles.page}>
      {/* Hero */}
      <div style={styles.banner}>
        <div>
          <h1 style={styles.title}>🛍 Welcome to ShopEasy</h1>

          <p style={styles.subtitle}>
            India's Smart Online Shopping Destination
          </p>

          <Link to="/products">
            <button style={styles.shopBtn}>
              Shop Now →
            </button>
          </Link>
        </div>
      </div>

      {/* Stats */}

      <section style={styles.stats}>
        <div style={styles.stat}>
          <h2>500+</h2>
          <p>Products</p>
        </div>

        <div style={styles.stat}>
          <h2>10K+</h2>
          <p>Happy Customers</p>
        </div>

        <div style={styles.stat}>
          <h2>24/7</h2>
          <p>Support</p>
        </div>

        <div style={styles.stat}>
          <h2>100%</h2>
          <p>Secure Payment</p>
        </div>
      </section>

      {/* Categories */}

      <section style={styles.section}>
        <h2>Shop by Category</h2>

        <div style={styles.categories}>
          <div style={styles.category}>📱 Mobiles</div>
          <div style={styles.category}>🎧 Electronics</div>
          <div style={styles.category}>⌚ Watches</div>
          <div style={styles.category}>🖥 Accessories</div>
        </div>
      </section>

      {/* Products */}

      <section style={styles.section}>
        <h2>Featured Products</h2>

        <div style={styles.grid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
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

        <p>
          About | Contact | Privacy Policy
        </p>

        <p>
          © 2026 ShopEasy. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    background: "#f1f3f6",
  },

  banner: {
    height: "420px",
    background:
      "linear-gradient(135deg,#2874f0,#0f52ba)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textAlign: "center",
  },

  title: {
    fontSize: "48px",
    marginBottom: "15px",
  },

  subtitle: {
    fontSize: "22px",
  },

  shopBtn: {
    marginTop: "25px",
    padding: "15px 35px",
    background: "#fb641b",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "6px",
    fontSize: "18px",
  },

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gap: "20px",
    padding: "40px",
  },

  stat: {
    background: "black",
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
    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  category: {
    background: "white",
    padding: "25px",
    textAlign: "center",
    fontSize: "20px",
    borderRadius: "10px",
    boxShadow: "0 3px 10px rgba(0,0,0,.1)",
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
    background: "#2874f0",
    color: "white",
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
    background: "white",
    padding: "30px",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "0 3px 10px rgba(0,0,0,.1)",
  },

  footer: {
    background: "#172337",
    color: "white",
    textAlign: "center",
    padding: "40px",
    marginTop: "40px",
  },
};

export default Home;