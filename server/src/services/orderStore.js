import { v4 as uuid } from 'uuid';
import { db } from '../config/db.js';

const orders = new Map();
const payments = new Map();

export async function createOrder({ items, amount, customer }) {
  if (!items?.length) {
    throw new Error('Cannot create order without items');
  }

  const orderId = uuid();
  const now = new Date().toISOString();

  const order = {
    id: orderId,
    items,
    amount,
    customer: customer || {},
    status: 'pending',
    paymentStatus: 'unpaid',
    createdAt: now,
    updatedAt: now
  };

  orders.set(orderId, order);

  if (db.enabled) {
    try {
      await db.query(
        `INSERT INTO orders (id, customer_name, customer_phone, total_amount, status, payment_status)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          orderId,
          order.customer?.name || null,
          order.customer?.phone || null,
          amount,
          order.status,
          order.paymentStatus
        ]
      );

      const itemInsertPromises = items.map(item =>
        db.query(
          `INSERT INTO order_items (order_id, product_id, quantity, unit_price)
           VALUES ($1, $2, $3, $4)`,
          [orderId, item.productId, item.quantity, item.unitPrice]
        )
      );
      await Promise.all(itemInsertPromises);
    } catch (error) {
      console.warn('[DB] Failed to persist order, continuing with in-memory store', error.message);
    }
  }

  return order;
}

export async function getOrderById(orderId) {
  return orders.get(orderId) || null;
}

export async function recordPayment(orderId, payment) {
  const order = orders.get(orderId);

  if (!order) {
    throw new Error('Order not found');
  }

  const paymentId = uuid();
  const paymentRecord = {
    id: paymentId,
    orderId,
    method: payment.method,
    amountPaid: payment.amountPaid,
    transactionId: payment.transactionId,
    status: payment.status,
    createdAt: new Date().toISOString()
  };

  payments.set(paymentId, paymentRecord);
  order.paymentStatus = payment.status;
  order.status = payment.status === 'confirmed' ? 'approved' : order.status;
  order.updatedAt = paymentRecord.createdAt;

  if (db.enabled) {
    try {
      await db.query(
        `INSERT INTO payments (id, order_id, method, amount_paid, transaction_id, status)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          paymentId,
          orderId,
          payment.method,
          payment.amountPaid,
          payment.transactionId,
          payment.status
        ]
      );

      await db.query(
        `UPDATE orders
           SET status = $2,
               payment_status = $3,
               updated_at = NOW()
         WHERE id = $1`,
        [orderId, order.status, order.paymentStatus]
      );
    } catch (error) {
      console.warn('[DB] Failed to persist payment information', error.message);
    }
  }

  return { order, payment: paymentRecord };
}

