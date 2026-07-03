import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";

function Navbar() {
  const { cart } = useCart();
  const { search, setSearch } = useSearch();
  const location = useLocation();

  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <Link to="/" style={styles.logo}>
        🛍 ShopEasy
      </Link>

      {/* Search Box (Only on Products Page) */}
      {location.pathname === "/products" && (
        <div style={styles.searchContainer}>
          <span style={styles.searchIcon}>🔍</span>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.search}
          />
        </div>
      )}

      {/* Navigation Links */}
      <div style={styles.links}>
        <Link to="/" style={styles.link}>
          🏠 Home
        </Link>

        <Link to="/products" style={styles.link}>
          📦 Products
        </Link>

        <Link to="/cart" style={styles.link}>
          🛒 Cart
          <span style={styles.badge}>{cart.length}</span>
        </Link>

        <Link to="/login" style={styles.loginBtn}>
          👤 Login
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#2874f0",
    padding: "15px 30px",
    boxShadow: "0 3px 10px rgba(0,0,0,.2)",
    gap: "20px",
    flexWrap: "wrap",
  },

  logo: {
    color: "white",
    textDecoration: "none",
    fontSize: "28px",
    fontWeight: "bold",
  },

  searchContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    background: "white",
    borderRadius: "6px",
    maxWidth: "500px",
    overflow: "hidden",
  },

  searchIcon: {
    padding: "0 12px",
    fontSize: "18px",
  },

  search: {
    width: "100%",
    padding: "12px",
    border: "none",
    outline: "none",
    fontSize: "16px",
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
    flexWrap: "wrap",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "17px",
  },

  badge: {
    background: "#fb641b",
    color: "white",
    borderRadius: "50%",
    padding: "2px 8px",
    marginLeft: "6px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  loginBtn: {
    background: "white",
    color: "#2874f0",
    textDecoration: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    fontWeight: "bold",
  },
};

export default Navbar;