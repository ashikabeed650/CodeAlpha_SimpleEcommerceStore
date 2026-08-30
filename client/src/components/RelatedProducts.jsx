import { useEffect, useState } from "react";
import api from "../api/api";
import ProductCard from "./ProductCard";

function RelatedProducts({ currentProductId }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.get("/products");

      setProducts(
        res.data
          .filter((p) => p._id !== currentProductId)
          .slice(0, 3)
      );
    };

    fetchProducts();
  }, [currentProductId]);

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