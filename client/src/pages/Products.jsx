import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/api";
import ProductCard from "../components/ProductCard";
import { useSearch } from "../context/SearchContext";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { search, setSearch } = useSearch();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "";

  useEffect(() => {
    let active = true;
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        if (!Array.isArray(res.data)) {
          throw new Error("The product API returned an invalid response.");
        }
        if (active) setProducts(res.data);
      } catch (error) {
        if (active) {
          setError(
            error.response?.data?.message ||
              "Unable to load products. Check the backend URL and database connection."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      active = false;
    };
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.brand.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());

    // Flexible category matching: checks if product.category contains the requested category
    const matchesCategory = categoryParam
      ? product.category.toLowerCase().includes(categoryParam.toLowerCase())
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Explore Products</h1>

      {loading ? (
        <p style={styles.count}>Loading products...</p>
      ) : error ? (
        <div style={styles.notFound} role="alert">
          <h2>Products are unavailable</h2>
          <p>{error}</p>
        </div>
      ) : products.length === 0 ? (
        <div style={styles.notFound}>
          <h2>No products have been added yet</h2>
          <p>Seed the backend catalog to make products available.</p>
        </div>
      ) : (
        <>
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
            onClick={() => {
              setSearch("");
              setSearchParams({});
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
        </>
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