import React from 'react';

import '../styles/Cart.css';

export default function Cart({
  items,
  isOpen,
  onClose,
  orderId,
  orderStatus,
  amountDue = 0,
  isSyncingOrder,
  isConfirmingPayment,
  paymentFeedback,
  onConfirmPayment = () => {}
}) {
  const fallbackProductImage = 'https://via.placeholder.com/80x80?text=Cart';

  const handleImageError = (event) => {
    event.target.onerror = null;
    event.target.src = fallbackProductImage;
  };

  const currencyFormatter = new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR'
  });

  const formatCurrency = (value) => currencyFormatter.format(Number(value) || 0);

  const total = items.reduce((sum, item) => {
    const itemPrice = item.product.price * (1 - item.product.discount / 100);
    return sum + itemPrice * item.quantity;
  }, 0);

  const savings = items.reduce((sum, item) => {
    return sum + (item.product.price * item.product.discount / 100) * item.quantity;
  }, 0);

  const subtotal = total + savings;

  const paymentMethods = [
    {
      id: 'easypaisa',
      title: 'EasyPaisa Transfer',
      icon: 'https://seeklogo.com/images/E/easypaisa-logo-6B8B6B6B2C-seeklogo.com.png',
      fields: [
        { label: 'Account Number', value: '0311-3254286' },
        { label: 'Account Name', value: 'Muhammad Bilal' }
      ],
      note: 'Send screenshot once payment is done.'
    },
    {
      id: 'bank',
      title: 'Meezan Bank',
      icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      fields: [
        { label: 'Account Title', value: 'Sasta Bazar' },
        { label: 'Account Number', value: '0123-45678901-2' }
      ],
      note: 'Use reference SBZ + your phone number.'
    }
  ];

  const statusCopy = {
    idle: 'Draft',
    pending: 'Pending',
    approved: 'Approved',
    'pending-review': 'Pending Review',
    error: 'Sync Error'
  };

  const statusStyle = {
    approved: 'success',
    draft: 'muted',
    idle: 'muted',
    pending: 'warning',
    'pending-review': 'warning',
    error: 'error'
  };

  const computedStatus = statusCopy[orderStatus] || orderStatus || 'Draft';
  const badgeVariant = statusStyle[orderStatus] || 'muted';
  const disablePaymentButton = !orderId || !items.length || isSyncingOrder || isConfirmingPayment;

  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose}></div>}
      <div className={`cart-modal ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        {items.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <p className="empty-message">Add some products to get started!</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item, index) => {
                const itemPrice = item.product.price * (1 - item.product.discount / 100);
                return (
                  <div key={index} className="cart-item">
                    <img
                      src={item.product.image || fallbackProductImage}
                      alt={item.product.name}
                      loading="lazy"
                      onError={handleImageError}
                    />
                    <div className="item-details">
                      <h4>{item.product.name}</h4>
                      <p>{formatCurrency(itemPrice)} × {item.quantity}</p>
                    </div>
                    <div className="item-total">
                      {formatCurrency(itemPrice * item.quantity)}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="summary-row savings">
                <span>Savings:</span>
                <span className="savings-text">-{formatCurrency(savings)}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
            <div className="payment-details">
              <div className="order-meta">
                <div>
                  <span className="meta-label">Order ID</span>
                  <strong>{orderId ?? 'Syncing...'}</strong>
                </div>
                <span className={`status-badge ${badgeVariant}`}>
                  {isSyncingOrder ? 'Syncing…' : computedStatus}
                </span>
              </div>
              {isSyncingOrder && (
                <p className="order-sync-text">Updating order with server…</p>
              )}
              <h3>Payment Details</h3>
              <p className="payment-subtitle">Complete your order using any option below.</p>
              <div className="payment-total">
                <span>Amount Due</span>
                <strong>{formatCurrency(amountDue || total)}</strong>
              </div>
              <div className="payment-methods">
                {paymentMethods.map(method => (
                  <div key={method.id} className="payment-method-card">
                    <div className="method-header">
                      <img src={method.icon} alt={method.title} />
                      <div>
                        <h4>{method.title}</h4>
                        <span>Instant confirmation</span>
                      </div>
                    </div>
                    <div className="method-body">
                      {method.fields.map(field => (
                        <div className="method-field" key={field.label}>
                          <span>{field.label}</span>
                          <strong>{field.value}</strong>
                        </div>
                      ))}
                    </div>
                    <p className="method-note">{method.note}</p>
                  </div>
                ))}
              </div>
              {paymentFeedback && (
                <p className={`payment-feedback ${paymentFeedback.type}`}>
                  {paymentFeedback.message}
                </p>
              )}
              <button
                className="checkout-btn"
                onClick={onConfirmPayment}
                disabled={disablePaymentButton}
              >
                {isConfirmingPayment ? 'Confirming…' : 'Confirm Payment (EasyPaisa)'}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
