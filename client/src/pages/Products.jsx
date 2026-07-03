import { useState, useEffect } from "react";
import api from "../api/api";
import ProductCard from "../components/ProductCard";
import { useSearch } from "../context/SearchContext";

function Products() {
  const [products, setProducts] = useState([]);
  const { search, setSearch } = useSearch();

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

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.brand.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Explore Products</h1>

      <p style={styles.count}>
        {filteredProducts.length} Product
        {filteredProducts.length !== 1 && "s"} Found
      </p>

      {filteredProducts.length > 0 ? (
        <div style={styles.grid}>
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div style={styles.notFound}>
          <div style={styles.icon}>🔍</div>

          <h2>No Products Found</h2>

          <p>
            Sorry! We couldn't find any product matching
          </p>

          <h3 style={{ color: "#2874f0" }}>
            "{search}"
          </h3>

          <p style={{ color: "#666" }}>
            Try searching with another product, brand or category.
          </p>

          <button
            style={styles.button}
            onClick={() => setSearch("")}
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "#f1f3f6",
    minHeight: "100vh",
  },

  heading: {
    textAlign: "center",
    marginBottom: "10px",
    color: "#333",
  },

  count: {
    textAlign: "center",
    color: "#666",
    marginBottom: "30px",
    fontSize: "18px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
    gap: "25px",
  },

  notFound: {
    background: "#fff",
    maxWidth: "600px",
    margin: "50px auto",
    padding: "50px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 5px 20px rgba(0,0,0,.08)",
  },

  icon: {
    fontSize: "70px",
    marginBottom: "20px",
  },

  button: {
    marginTop: "25px",
    padding: "12px 30px",
    background: "#2874f0",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default Products;