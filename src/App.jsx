import { useState } from 'react';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Toast from './components/Toast';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Wireless Earbuds',
      category: 'Electronics',
      price: 2999,
      discount: 40,
      image: 'https://via.placeholder.com/250x250?text=Wireless+Earbuds',
      description: 'High-quality sound with noise cancellation',
      rating: 4.5,
      reviews: 234
    },
    {
      id: 2,
      name: 'LED Smart Bulb',
      category: 'Home',
      price: 599,
      discount: 35,
      image: 'https://via.placeholder.com/250x250?text=Smart+Bulb',
      description: 'Control your lights with smartphone',
      rating: 4.2,
      reviews: 156
    },
    {
      id: 3,
      name: 'USB-C Cable',
      category: 'Accessories',
      price: 399,
      discount: 25,
      image: 'https://via.placeholder.com/250x250?text=USB-C+Cable',
      description: 'Fast charging 3.0A capacity',
      rating: 4.7,
      reviews: 542
    },
    {
      id: 4,
      name: 'Phone Stand',
      category: 'Accessories',
      price: 299,
      discount: 20,
      image: 'https://via.placeholder.com/250x250?text=Phone+Stand',
      description: 'Adjustable metal phone holder',
      rating: 4.4,
      reviews: 198
    },
    {
      id: 5,
      name: 'Portable Power Bank',
      category: 'Electronics',
      price: 1299,
      discount: 30,
      image: 'https://via.placeholder.com/250x250?text=Power+Bank',
      description: '20000mAh fast charging',
      rating: 4.6,
      reviews: 387
    },
    {
      id: 6,
      name: 'Desk Lamp',
      category: 'Home',
      price: 999,
      discount: 45,
      image: 'https://via.placeholder.com/250x250?text=Desk+Lamp',
      description: 'LED with flexible neck',
      rating: 4.3,
      reviews: 267
    },
    {
      id: 7,
      name: 'Screen Protector',
      category: 'Accessories',
      price: 199,
      discount: 15,
      image: 'https://via.placeholder.com/250x250?text=Screen+Protector',
      description: 'Tempered glass for phone',
      rating: 4.5,
      reviews: 445
    },
    {
      id: 8,
      name: 'Bluetooth Speaker',
      category: 'Electronics',
      price: 1999,
      discount: 35,
      image: 'https://via.placeholder.com/250x250?text=Bluetooth+Speaker',
      description: 'Portable with 12-hour battery',
      rating: 4.6,
      reviews: 523
    },
    {
      id: 9,
      name: 'Phone Case',
      category: 'Accessories',
      price: 299,
      discount: 22,
      image: 'https://via.placeholder.com/250x250?text=Phone+Case',
      description: 'Shock-resistant protection',
      rating: 4.4,
      reviews: 612
    },
    {
      id: 10,
      name: 'Keyboard & Mouse Combo',
      category: 'Electronics',
      price: 1499,
      discount: 40,
      image: 'https://via.placeholder.com/250x250?text=Keyboard+Mouse',
      description: 'Wireless with long battery life',
      rating: 4.5,
      reviews: 298
    },
    {
      id: 11,
      name: 'Web Camera',
      category: 'Electronics',
      price: 2499,
      discount: 28,
      image: 'https://via.placeholder.com/250x250?text=Web+Camera',
      description: '1080p HD with auto focus',
      rating: 4.3,
      reviews: 176
    },
    {
      id: 12,
      name: 'Storage Organizer',
      category: 'Home',
      price: 499,
      discount: 30,
      image: 'https://via.placeholder.com/250x250?text=Storage+Box',
      description: 'Foldable fabric storage',
      rating: 4.2,
      reviews: 234
    }
  ];

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.product.id === product.id);
    let quantity = 1;
    
    if (existingItem) {
      quantity = existingItem.quantity + 1;
      setCartItems(cartItems.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }

    // Add toast notification
    const toastId = Date.now();
    setToasts([...toasts, {
      id: toastId,
      productName: product.name,
      message: 'Added to cart',
      quantity: quantity
    }]);
  };

  const removeToast = (toastId) => {
    setToasts(toasts.filter(toast => toast.id !== toastId));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app">
      <Header cartCount={cartCount} onCartClick={() => setIsCartOpen(!isCartOpen)} />
      <ProductGrid products={products} onAddToCart={handleAddToCart} />
      <Cart items={cartItems} isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Footer />
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            productName={toast.productName}
            message={toast.message}
            quantity={toast.quantity}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
