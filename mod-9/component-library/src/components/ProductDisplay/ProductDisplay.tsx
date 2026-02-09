// src/components/ProductDisplay/ProductDisplay.tsx
import React from 'react';
import type { ProductDisplayProps } from '../../types';

const ProductDisplay: React.FC<ProductDisplayProps> = ({
  product,
  showDescription = true,
  showStockStatus = true,
  onAddToCart,
  children
}) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
      <img
        className="w-full h-64 object-cover"
        src={product.imageUrl}
        alt={product.name}
      />
      
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          {product.name}
        </h3>
        
        <p className="text-3xl font-bold text-blue-600 mb-4">
          ${product.price.toFixed(2)}
        </p>
        
        {showDescription && (
          <p className="text-gray-600 mb-4">{product.description}</p>
        )}
        
        {showStockStatus && (
          <p className={`font-semibold mb-4 ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </p>
        )}
        
        {onAddToCart && product.inStock && (
          <button
            onClick={() => onAddToCart(product.id)}
            className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add to Cart
          </button>
        )}
        
        {children}
      </div>
    </div>
  );
};

export default ProductDisplay;