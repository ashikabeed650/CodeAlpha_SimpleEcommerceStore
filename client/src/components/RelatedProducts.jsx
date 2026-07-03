import products from "../data/product";
import ProductCard from "./ProductCard";

function RelatedProducts({ currentProductId }) {
  const relatedProducts = products
    .filter((product) => product.id !== currentProductId)
    .slice(0, 3);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Related Products</h2>

      <div style={styles.grid}>
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
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
  },

  heading: {
    marginBottom: "20px",
    fontSize: "28px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(250px,1fr))",
    gap: "20px",
  },
};

export default RelatedProducts;