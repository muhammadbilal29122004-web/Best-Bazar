import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Toast from './components/Toast';
import './App.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const fallbackProducts = [
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
  },
  {
    id: 13,
    name: 'Gaming Mouse',
    category: 'Electronics',
    price: 1899,
    discount: 32,
    image: 'https://via.placeholder.com/250x250?text=Gaming+Mouse',
    description: 'Ergonomic RGB mouse with 7 buttons',
    rating: 4.5,
    reviews: 321
  },
  {
    id: 14,
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    price: 3499,
    discount: 25,
    image: 'https://via.placeholder.com/250x250?text=Mechanical+Keyboard',
    description: 'Hot-swappable switches with backlight',
    rating: 4.8,
    reviews: 287
  },
  {
    id: 15,
    name: 'Yoga Mat',
    category: 'Fitness',
    price: 799,
    discount: 30,
    image: 'https://via.placeholder.com/250x250?text=Yoga+Mat',
    description: 'Anti-slip mat for workouts',
    rating: 4.3,
    reviews: 432
  },
  {
    id: 16,
    name: 'Smartwatch',
    category: 'Electronics',
    price: 5999,
    discount: 35,
    image: 'https://via.placeholder.com/250x250?text=Smartwatch',
    description: 'Track fitness, calls and notifications',
    rating: 4.4,
    reviews: 512
  },
  {
    id: 17,
    name: 'Travel Backpack',
    category: 'Accessories',
    price: 2199,
    discount: 28,
    image: 'https://via.placeholder.com/250x250?text=Backpack',
    description: 'Water-resistant backpack with USB port',
    rating: 4.5,
    reviews: 178
  },
  {
    id: 18,
    name: 'Air Purifier',
    category: 'Home',
    price: 7499,
    discount: 40,
    image: 'https://via.placeholder.com/250x250?text=Air+Purifier',
    description: 'HEPA filter for clean air',
    rating: 4.6,
    reviews: 204
  },
  {
    id: 19,
    name: 'Induction Cooktop',
    category: 'Home',
    price: 3299,
    discount: 33,
    image: 'https://via.placeholder.com/250x250?text=Cooktop',
    description: 'Energy efficient touch control cooktop',
    rating: 4.2,
    reviews: 389
  },
  {
    id: 20,
    name: 'Fitness Tracker',
    category: 'Fitness',
    price: 2499,
    discount: 27,
    image: 'https://via.placeholder.com/250x250?text=Fitness+Tracker',
    description: 'Heart rate and sleep monitoring',
    rating: 4.1,
    reviews: 264
  },
  {
    id: 21,
    name: 'Action Camera',
    category: 'Electronics',
    price: 9999,
    discount: 30,
    image: 'https://via.placeholder.com/250x250?text=Action+Camera',
    description: '4K waterproof sports camera',
    rating: 4.3,
    reviews: 156
  },
  {
    id: 22,
    name: 'Cordless Vacuum',
    category: 'Home',
    price: 5499,
    discount: 22,
    image: 'https://via.placeholder.com/250x250?text=Vacuum',
    description: 'Lightweight vacuum for quick cleaning',
    rating: 4.4,
    reviews: 189
  },
  {
    id: 23,
    name: 'Laptop Stand',
    category: 'Accessories',
    price: 1599,
    discount: 26,
    image: 'https://via.placeholder.com/250x250?text=Laptop+Stand',
    description: 'Adjustable aluminum stand',
    rating: 4.6,
    reviews: 245
  },
  {
    id: 24,
    name: 'Noise Cancelling Headphones',
    category: 'Electronics',
    price: 7999,
    discount: 38,
    image: 'https://via.placeholder.com/250x250?text=Headphones',
    description: 'Over-ear headphones with deep bass',
    rating: 4.7,
    reviews: 512
  },
  {
    id: 25,
    name: 'Portable Projector',
    category: 'Electronics',
    price: 12999,
    discount: 34,
    image: 'https://via.placeholder.com/250x250?text=Projector',
    description: 'Mini projector for home cinema',
    rating: 4.2,
    reviews: 148
  },
  {
    id: 26,
    name: 'Electric Kettle',
    category: 'Home',
    price: 1399,
    discount: 29,
    image: 'https://via.placeholder.com/250x250?text=Electric+Kettle',
    description: 'Stainless steel auto shut-off kettle',
    rating: 4.3,
    reviews: 309
  },
  {
    id: 27,
    name: 'Wireless Charger',
    category: 'Accessories',
    price: 999,
    discount: 24,
    image: 'https://via.placeholder.com/250x250?text=Wireless+Charger',
    description: 'Fast wireless charging pad',
    rating: 4.4,
    reviews: 278
  },
  {
    id: 28,
    name: 'Smart Home Hub',
    category: 'Electronics',
    price: 4599,
    discount: 31,
    image: 'https://via.placeholder.com/250x250?text=Smart+Hub',
    description: 'Control all smart devices in one place',
    rating: 4.1,
    reviews: 132
  },
  {
    id: 29,
    name: 'Electric Toothbrush',
    category: 'Personal Care',
    price: 2499,
    discount: 36,
    image: 'https://via.placeholder.com/250x250?text=Toothbrush',
    description: 'Sonic toothbrush with 5 modes',
    rating: 4.6,
    reviews: 221
  },
  {
    id: 30,
    name: 'Hair Dryer',
    category: 'Personal Care',
    price: 1999,
    discount: 28,
    image: 'https://via.placeholder.com/250x250?text=Hair+Dryer',
    description: 'Ionic dryer with 3 heat settings',
    rating: 4.5,
    reviews: 198
  },
  {
    id: 31,
    name: 'Camping Lantern',
    category: 'Outdoors',
    price: 1499,
    discount: 33,
    image: 'https://via.placeholder.com/250x250?text=Lantern',
    description: 'Rechargeable LED lantern',
    rating: 4.4,
    reviews: 164
  },
  {
    id: 32,
    name: 'Massage Gun',
    category: 'Fitness',
    price: 5999,
    discount: 37,
    image: 'https://via.placeholder.com/250x250?text=Massage+Gun',
    description: 'Deep tissue muscle massage gun',
    rating: 4.5,
    reviews: 205
  }
];
function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(fallbackProducts);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [orderId, setOrderId] = useState(null);
  const [orderStatus, setOrderStatus] = useState('idle');
  const [isSyncingOrder, setIsSyncingOrder] = useState(false);
  const [isConfirmingPayment, setIsConfirmingPayment] = useState(false);
  const [paymentFeedback, setPaymentFeedback] = useState(null);

  useEffect(() => {
    let isActive = true;

    const loadProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        if (isActive) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error(error);
        if (isActive) {
          setProducts(fallbackProducts);
        }
      } finally {
        if (isActive) {
          setIsLoadingProducts(false);
        }
      }
    };

    loadProducts();

    return () => {
      isActive = false;
    };
  }, [API_BASE_URL]);

  useEffect(() => {
    if (!cartItems.length) {
      setOrderId(null);
      setOrderStatus('idle');
      setPaymentFeedback(null);
      return;
    }

    let cancelled = false;

    const syncOrder = async () => {
      setIsSyncingOrder(true);
      const itemsPayload = cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        unitPrice: item.product.price * (1 - item.product.discount / 100)
      }));
      const amount = itemsPayload.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0
      );

      try {
        const response = await fetch(`${API_BASE_URL}/api/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: itemsPayload,
            amount: Number(amount.toFixed(2)),
            customer: { name: 'Guest Checkout', phone: '' }
          })
        });

        if (!response.ok) {
          throw new Error('Failed to sync order with server');
        }

        const data = await response.json();

        if (!cancelled) {
          setOrderId(data.order.id);
          setOrderStatus(data.order.status);
        }
      } catch (error) {
        console.error(error);
        if (!cancelled) {
          setOrderStatus('error');
        }
      } finally {
        if (!cancelled) {
          setIsSyncingOrder(false);
        }
      }
    };

    syncOrder();

    return () => {
      cancelled = true;
    };
  }, [cartItems, API_BASE_URL]);

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return products;
    return products.filter(product =>
      [product.name, product.category, product.description].some(field =>
        field.toLowerCase().includes(term)
      )
    );
  }, [products, searchTerm]);

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

  const handleConfirmPayment = async () => {
    if (!orderId) {
      setPaymentFeedback({ type: 'error', message: 'Order not synced yet. Please wait a moment.' });
      return;
    }

    setIsConfirmingPayment(true);

    const amount = cartItems.reduce(
      (sum, item) =>
        sum + item.quantity * (item.product.price * (1 - item.product.discount / 100)),
      0
    );

    try {
      const response = await fetch(`${API_BASE_URL}/api/payments/easypaisa/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          amountPaid: Number(amount.toFixed(2)),
          transactionId: `SIM-${Date.now()}`
        })
      });

      if (!response.ok) {
        throw new Error('Payment confirmation failed');
      }

      const data = await response.json();
      setOrderStatus(data.order.status);
      setPaymentFeedback({
        type: data.simulation.autoApproved ? 'success' : 'warning',
        message: data.simulation.message
      });

      if (data.simulation.autoApproved) {
        setCartItems([]);
      }
    } catch (error) {
      console.error(error);
      setPaymentFeedback({
        type: 'error',
        message: error.message || 'Payment confirmation failed'
      });
    } finally {
      setIsConfirmingPayment(false);
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) =>
      sum + item.quantity * (item.product.price * (1 - item.product.discount / 100)),
    0
  );

  return (
    <div className="app">
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(!isCartOpen)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <ProductGrid
        products={filteredProducts}
        onAddToCart={handleAddToCart}
        isLoading={isLoadingProducts}
      />
      <Cart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        orderId={orderId}
        orderStatus={orderStatus}
        amountDue={cartTotal}
        isSyncingOrder={isSyncingOrder}
        isConfirmingPayment={isConfirmingPayment}
        paymentFeedback={paymentFeedback}
        onConfirmPayment={handleConfirmPayment}
      />
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
