import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Login Successful ✅");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <h1 style={styles.title}>Login</h1>

        <p style={styles.text}>
          Get access to your Orders,
          <br />
          Wishlist and Recommendations.
        </p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
          alt="login"
          style={styles.image}
        />
      </div>

      <div style={styles.right}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button
          style={styles.loginBtn}
          onClick={handleLogin}
        >
          Login
        </button>

        <p style={styles.or}>OR</p>

        <button style={styles.otpBtn}>
          Request OTP
        </button>

        <p style={styles.signup}>
          New to ShopEasy?{" "}
          <Link to="/register" style={styles.link}>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    width: "70%",
    maxWidth: "900px",
    margin: "40px auto",
    background: "#fff",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    borderRadius: "8px",
    overflow: "hidden",
  },

  left: {
    flex: 1,
    background: "#2874f0",
    color: "white",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  title: {
    fontSize: "32px",
    marginBottom: "20px",
  },

  text: {
    fontSize: "18px",
    lineHeight: "28px",
  },

  image: {
    width: "180px",
    alignSelf: "center",
  },

  right: {
    flex: 1.4,
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  input: {
    padding: "14px",
    marginBottom: "20px",
    border: "none",
    borderBottom: "2px solid #ccc",
    outline: "none",
    fontSize: "16px",
  },

  loginBtn: {
    background: "#fb641b",
    color: "white",
    padding: "14px",
    border: "none",
    fontSize: "17px",
    cursor: "pointer",
    borderRadius: "4px",
    marginBottom: "20px",
  },

  or: {
    textAlign: "center",
    color: "#777",
    marginBottom: "20px",
  },

  otpBtn: {
    background: "white",
    color: "#2874f0",
    padding: "14px",
    border: "1px solid #ddd",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "4px",
  },

  signup: {
    marginTop: "30px",
    textAlign: "center",
    fontSize: "15px",
  },

  link: {
    color: "#2874f0",
    fontWeight: "bold",
    textDecoration: "none",
  },
};

export default Login;