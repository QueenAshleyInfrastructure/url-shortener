// src/App.tsx
import { useState } from 'react';
import AlertBox from './components/AlertBox/AlertBox';
import UserProfileCard from './components/UserProfileCard/UserProfileCard';
import ProductDisplay from './components/ProductDisplay/ProductDisplay';
import type { User, Product } from './types';

function App() {
  const [showAlert, setShowAlert] = useState(false);
  const [cartItems, setCartItems] = useState<string[]>([]);

  const user: User = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Software Engineer',
    avatarUrl: 'https://via.placeholder.com/150'
  };

  const product: Product = {
    id: '1',
    name: 'Wireless Headphones',
    price: 199.99,
    description: 'High-quality wireless headphones with noise cancellation.',
    imageUrl: 'https://via.placeholder.com/400x300',
    inStock: true
  };

  const handleAddToCart = (productId: string) => {
    setCartItems([...cartItems, productId]);
    setShowAlert(true);
  };

  const handleEdit = (userId: string) => {
    alert(`Editing user ${userId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Component Library Demo
        </h1>

        {showAlert && (
          <div className="mb-8">
            <AlertBox
              type="success"
              message="Product added to cart!"
              onClose={() => setShowAlert(false)}
            >
              <p className="text-sm mt-2">You can now continue using the application.</p>
            </AlertBox>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <UserProfileCard
            user={user}
            showEmail={true}
            showRole={true}
            onEdit={handleEdit}
          >
            <div className="text-sm text-gray-500 mt-4">
              Last login: 2 hours ago
            </div>
          </UserProfileCard>

          <ProductDisplay
            product={product}
            showDescription={true}
            showStockStatus={true}
            onAddToCart={handleAddToCart}
          >
            <div className="text-sm text-gray-500 mt-4">
              Free shipping available
            </div>
          </ProductDisplay>
        </div>
      </div>
    </div>
  );
}

export default App;