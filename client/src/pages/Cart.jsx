import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../api/api";
import { API_ORIGIN } from "../api/api";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function MapSelector({ position, setPosition, setAddress }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);

      // reverse geocode with Nominatim
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
        { headers: { "User-Agent": "ShopEasy/1.0 (your-email@example.com)" } }
      )
        .then((r) => r.json())
        .then((data) => {
          setAddress(data.display_name || "");
        })
        .catch(() => setAddress(""));
    },
  });

  return position ? <Marker position={position} /> : null;
}

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = cart.reduce(
    (sum, item) =>
      sum + (item.originalPrice - item.price) * item.quantity,
    0
  );

  const gst = Math.floor(total * 0.18);

  const finalPrice = total + gst;

  const [showMap, setShowMap] = useState(false);
  const [position, setPosition] = useState(null);
  const [addressText, setAddressText] = useState("");

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!position || !addressText) {
      alert("Please select a delivery location on the map before placing the order.");
      setShowMap(true);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please log in before placing an order.");
        navigate("/login");
        return;
      }

      const payload = {
        products: cart,
        totalAmount: finalPrice,
        address: {
          fullAddress: addressText,
          coordinates: { lat: position[0], lng: position[1] },
        },
      };

      await api.post("/orders", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("🎉 Order Placed Successfully!");

      clearCart();

      navigate("/");
    } catch (error) {
      console.log(error);
      const msg = error.response?.data?.message || error.message || "Order Failed";
      alert(msg);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <h2 style={styles.heading}>🛒 My Cart ({cart.length})</h2>

        {cart.length === 0 ? (
          <div style={styles.empty}>
            <h1>🛒</h1>

            <h3>Your Cart is Empty</h3>

            <p>Looks like you haven't added anything yet.</p>

            <Link to="/products">
              <button style={styles.shopBtn}>
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item._id} style={styles.card}>
              <img
                src={`${API_ORIGIN}${item.image}`}
                alt={item.name}
                style={styles.image}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/140?text=No+Image";
                }}
              />

              <div style={styles.info}>
                <h3>{item.name}</h3>

                <p style={styles.price}>₹{item.price}</p>

                <p style={styles.delivery}>
                  ✓ Free Delivery
                </p>

                <div style={styles.qty}>
                  <button
                    style={styles.qtyBtn}
                    onClick={() => decreaseQuantity(item._id)}
                  >
                    −
                  </button>

                  <span style={styles.qtyValue}>
                    {item.quantity}
                  </span>

                  <button
                    style={styles.qtyBtn}
                    onClick={() => increaseQuantity(item._id)}
                  >
                    +
                  </button>
                </div>

                <button
                  style={styles.remove}
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={styles.right}>
        <h3>PRICE DETAILS</h3>

        <hr />

        <div style={styles.row}>
          <span>Price ({cart.length} items)</span>
          <span>₹{total}</span>
        </div>

        <div style={styles.row}>
          <span>Discount</span>
          <span style={{ color: "green" }}>
            -₹{discount}
          </span>
        </div>

        <div style={styles.row}>
          <span>Delivery Charges</span>
          <span style={{ color: "green" }}>
            FREE
          </span>
        </div>

        <div style={styles.row}>
          <span>GST (18%)</span>
          <span>₹{gst}</span>
        </div>

        <hr />

        <div style={styles.total}>
          <span>Total Amount</span>
          <span>₹{finalPrice}</span>
        </div>

        <p style={styles.saved}>
          🎉 You saved ₹{discount} on this order
        </p>

        <div style={{ marginBottom: 12 }}>
          {addressText ? (
            <div>
              <strong>Delivery to:</strong>
              <p style={{ margin: "6px 0" }}>{addressText}</p>
              <button style={{ ...styles.shopBtn, background: "#fff", color: "#333", border: "1px solid #ddd" }} onClick={() => setShowMap(true)}>Change Location</button>
            </div>
          ) : (
            <button style={{ ...styles.shopBtn, background: "#2874f0" }} onClick={() => setShowMap(true)}>Select Delivery Location</button>
          )}
        </div>

        {showMap && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ height: 320 }}>
              <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "100%", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapSelector position={position} setPosition={setPosition} setAddress={setAddressText} />
              </MapContainer>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <input value={addressText} onChange={(e) => setAddressText(e.target.value)} placeholder="Address (you can edit)" style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #ddd" }} />
              <button style={styles.primary} onClick={() => setShowMap(false)}>Confirm</button>
            </div>
          </div>
        )}

        <button
          style={styles.orderBtn}
          onClick={handlePlaceOrder}
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    gap: "20px",
    padding: "30px",
    background: "#f1f3f6",
    minHeight: "90vh",
    flexWrap: "wrap",
  },

  left: {
    flex: 3,
  },

  right: {
    flex: 1,
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    height: "fit-content",
    boxShadow: "0 3px 12px rgba(0,0,0,.1)",
  },

  heading: {
    marginBottom: "20px",
  },

  card: {
    display: "flex",
    gap: "20px",
    background: "white",
    marginBottom: "20px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,.08)",
  },

  image: {
    width: "140px",
    height: "140px",
    objectFit: "contain",
  },

  info: {
    flex: 1,
  },

  price: {
    fontSize: "22px",
    fontWeight: "bold",
  },

  delivery: {
    color: "green",
    marginBottom: "15px",
    fontWeight: "bold",
  },

  qty: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "15px",
  },

  qtyBtn: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    border: "none",
    background: "#2874f0",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
  },

  qtyValue: {
    fontWeight: "bold",
    fontSize: "18px",
    minWidth: "20px",
    textAlign: "center",
  },

  remove: {
    background: "#ff6161",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    margin: "15px 0",
  },

  total: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "bold",
    fontSize: "22px",
    marginTop: "15px",
  },

  saved: {
    color: "green",
    marginTop: "15px",
    fontWeight: "bold",
  },

  orderBtn: {
    width: "100%",
    marginTop: "20px",
    padding: "14px",
    background: "linear-gradient(90deg, var(--cta), var(--accent))",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "17px",
    fontWeight: "800",
  },

  primary: { background: "linear-gradient(90deg,var(--cta),var(--accent))", color: "#fff", padding: "10px 16px", border: "none", borderRadius: 8, cursor: "pointer" },

  empty: {
    background: "white",
    padding: "60px",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,.08)",
  },

  shopBtn: {
    marginTop: "20px",
    padding: "12px 30px",
    background: "#2874f0",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default Cart;
