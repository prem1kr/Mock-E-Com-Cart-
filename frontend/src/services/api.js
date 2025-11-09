import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export async function getProducts() {
  const res = await axios.get(`${API_BASE}/products`);
  return res.data;
}

export async function getCart() {
  const res = await axios.get(`${API_BASE}/cart`);
  return res.data;
}

export async function addToCart(productId, qty) {
  const res = await axios.post(`${API_BASE}/cart`, { productId, qty });
  return res.data;
}

export async function removeFromCart(cartItemId) {
  const res = await axios.delete(`${API_BASE}/cart/${cartItemId}`);
  return res.data;
}

export async function checkout(cartItems, name, email) {
  const res = await axios.post(`${API_BASE}/cart/checkout`, { cartItems, name, email });
  return res.data;
}
