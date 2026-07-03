import headphones from "../assets/headphones.jpg";
import smartwatch from "../assets/smartwatch.jpg";
import mouse from "../assets/mouse.jpg";
import speaker from "../assets/speaker.jpg";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    brand: "Sony",
    category: "Electronics",
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    rating: 4.5,
    reviews: 2154,
    stock: 12,
    image: headphones,
    description:
      "Premium wireless headphones with noise cancellation and long battery life.",
  },
  {
    id: 2,
    name: "Smart Watch",
    brand: "Noise",
    category: "Wearables",
    price: 2999,
    originalPrice: 3999,
    discount: 25,
    rating: 4.3,
    reviews: 1876,
    stock: 18,
    image: smartwatch,
    description:
      "Track your fitness, heart rate, sleep and notifications with ease.",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    brand: "Logitech",
    category: "Accessories",
    price: 999,
    originalPrice: 1499,
    discount: 33,
    rating: 4.7,
    reviews: 3291,
    stock: 25,
    image: mouse,
    description:
      "RGB gaming mouse with adjustable DPI and ergonomic design.",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    brand: "JBL",
    category: "Audio",
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    rating: 4.4,
    reviews: 1643,
    stock: 15,
    image: speaker,
    description:
      "Portable Bluetooth speaker with deep bass and 12-hour battery.",
  },
];

export default products;