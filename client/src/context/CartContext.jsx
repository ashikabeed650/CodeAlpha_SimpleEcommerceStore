import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const validCart =
        Array.isArray(storedCart) &&
        storedCart.every(
          (item) =>
            item &&
            typeof item._id === "string" &&
            Number.isFinite(item.price) &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0
        );
      return validCart ? storedCart : [];
    } catch (error) {
      console.error("Unable to restore the saved cart:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Unable to save the cart:", error);
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item._id === product._id);
      const stock = Number.isInteger(product.stock) ? product.stock : Infinity;

      if (stock < 1 || (existing && existing.quantity >= stock)) {
        return currentCart;
      }

      if (existing) {
        return currentCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item._id !== id)
    );
  };

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item._id === id &&
        (!Number.isInteger(item.stock) || item.quantity < item.stock)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}