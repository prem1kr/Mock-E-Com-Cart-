import React, { useState } from 'react';
import '../../styles/ProductCard.css';

export default function ProductCard({ product, onAdd }) {
  const [added, setAdded] = useState(false);

  const handleAdd = async () => {
    await onAdd();
    setAdded(true);
    setTimeout(() => setAdded(false), 1400); 
  };

  return (
    <div className="card">
      <h3 className="title">{product.name}</h3>
      <p className="price">${product.price.toFixed(2)}</p>
      <button className="button" onClick={handleAdd} disabled={added}>
        {added ? 'Product Added!' : 'Add to Cart'}
      </button>
      {added && <span className="added-msg">Product Added!</span>}
    </div>
  );
}
