import { useEffect, useState } from 'react';
import { getProducts, addToCart as apiAddToCart } from '../services/api.js';
import { useCart } from '../context/CartContext.js';

export default function useProducts() {
  const { addToCart: contextAddToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId, qty = 1) => {
    try {
      await apiAddToCart(productId, qty);
      contextAddToCart(productId, qty);
    } catch {
      setError('Failed to add item to cart');
    }
  };

  return { products, loading, error, addToCart };
}
