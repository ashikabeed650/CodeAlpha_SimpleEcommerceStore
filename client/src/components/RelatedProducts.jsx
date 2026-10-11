import { useEffect, useState } from "react";
import api from "../api/api";
import ProductCard from "./ProductCard";

function RelatedProducts({ currentProductId }) {
  const [products, setProducts] = useState([]);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    let active = true;
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");

        if (active && Array.isArray(res.data)) {
          setProducts(
            res.data
              .filter((product) => product._id !== currentProductId)
              .slice(0, 3)
          );
        }
      } catch {
        if (active) setLoadFailed(true);
      }
    };

    fetchProducts();
    return () => {
      active = false;
    };
  }, [currentProductId]);

  if (loadFailed) {
    return (
      <div style={styles.container} role="alert">
        <h2 style={styles.heading}>Related products are unavailable.</h2>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Related Products</h2>

      <div style={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: "50px",
    padding: "30px",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "28px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
  },
};

export default RelatedProducts;