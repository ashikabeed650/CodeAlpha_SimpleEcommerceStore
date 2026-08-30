# 🛒 CodeAlpha - Simple E-commerce Store

A Full Stack MERN E-commerce Store developed as part of the **CodeAlpha Web Development Internship**.

---

## 📖 Project Overview

This project is a responsive e-commerce web application that allows users to browse products, view product details, register, log in, manage their shopping cart, and place orders. User information and order details are securely stored in MongoDB using a Node.js and Express.js backend.

---

## ✨ Features

- 🔐 User Registration
- 🔑 User Login with JWT Authentication
- 🛍️ Product Listing
- 📄 Product Details Page
- 🔍 Product Search
- 🛒 Shopping Cart Management
- ➕ Increase / Decrease Product Quantity
- ❌ Remove Products from Cart
- 📦 Order Placement
- 💾 MongoDB Database Integration
- 🌐 REST API Integration
- 📱 Fully Responsive Design (Mobile, Tablet & Desktop)

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router DOM
- CSS3
- Vite

### Backend

- Node.js
- Express.js
- REST API

### Database

- MongoDB
- Mongoose ODM

### Authentication

- JWT (JSON Web Token)

---

## 📂 Project Structure

```text
CodeAlpha_SimpleEcommerceStore
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
├── client
│   ├── public
│   ├── src
│   ├── components
│   ├── pages
│   ├── context
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/ashikabeed650/CodeAlpha_SimpleEcommerceStore.git
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 📸 Application Features

- 🏠 Home Page
- 🛍️ Products Page
- 📄 Product Details
- 👤 User Registration
- 🔐 User Login
- 🛒 Shopping Cart
- 📦 Order Processing
- 📱 Responsive User Interface
- 💾 MongoDB User & Order Storage

---

## 📄 API Endpoints

### Authentication

- POST `/api/users/register`
- POST `/api/users/login`

### Products

- GET `/api/products`
- GET `/api/products/:id`

### Orders

- POST `/api/orders`
- GET `/api/orders`

---

## 👨‍💻 Developer

**Ashik Abeed**

Web Development Intern – CodeAlpha

📧 Email: ashikabeed650@gmail.com

🌐 GitHub: https://github.com/ashikabeed650

---

## 📌 Internship Task

**Task 1 – Simple E-commerce Store**

Developed as part of the **CodeAlpha Web Development Internship**.

---

## 📄 License

This project is created for educational and internship purposes under the CodeAlpha Web Development Internship Program.

---

## ⭐ Acknowledgement

I would like to thank **CodeAlpha** for providing this opportunity to build a real-world Full Stack MERN application and enhance my web development skills.

---

## 📝 Recent updates

- Added entrance and hover animations to the Home hero, CTA and category cards (CSS keyframes in client/src/index.css).
- Re-added user greeting in the navigation bar: "Hello, <name>" with a Logout button (client/src/components/Navbar.jsx).
- Fixed order Authorization flow by automatically attaching the JWT token to outgoing API requests via a request interceptor (client/src/api/api.js). This prevents malformed/masked headers and 401s when placing orders.
- Address-on-map checkout remains available (react-leaflet + Nominatim reverse geocoding). Orders now store address.display_name and coordinates in the backend.
- Admin UI and admin product endpoints remain removed per earlier request.

Notes:
- The API client now appends Authorization: Bearer <token> from localStorage. If you prefer explicit header control per-call, revert the interceptor in client/src/api/api.js.
- Pushing to remote requires proper git remote and permissions; see below for commit/push status.

