import React from 'react';
import ProductCard from './ProductCard.js';
import useProducts from '../../hooks/useProduct.js';
import { useCart } from '../../context/CartContext.js';
import '../../styles/ProductGrid.css';

export default function ProductGrid() {
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='grid'>
      {products.map(product => (
        <ProductCard
          key={product._id}
          product={product}
          onAdd={() => addToCart(product._id, 1)}
        />
      ))}
    </div>
  );
}
