import { Router } from 'express';
import { getOrderById, recordPayment } from '../services/orderStore.js';
import { simulateEasypaisaPayment } from '../services/paymentSimulator.js';

const router = Router();

router.post('/easypaisa/simulate', async (req, res, next) => {
  try {
    const { orderId, amountPaid, transactionId } = req.body;

    if (!orderId || typeof amountPaid === 'undefined') {
      return res.status(400).json({ message: 'orderId and amountPaid are required' });
    }

    const order = await getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const simulation = simulateEasypaisaPayment({ order, amountPaid });

    const { payment, order: updatedOrder } = await recordPayment(orderId, {
      method: 'easypaisa',
      amountPaid,
      transactionId: transactionId || `EASY-${Date.now()}`,
      status: simulation.autoApproved ? 'confirmed' : 'pending-review'
    });

    res.json({
      order: updatedOrder,
      payment,
      simulation
    });
  } catch (error) {
    next(error);
  }
});

router.post('/webhook/easypaisa', async (req, res, next) => {
  try {
    const secret = req.headers['x-webhook-secret'];
    if (secret !== process.env.EASYPAISA_WEBHOOK_SECRET) {
      return res.status(401).json({ message: 'Invalid webhook secret' });
    }

    const { orderId, amountPaid, transactionId, status } = req.body;
    if (!orderId || !amountPaid) {
      return res.status(400).json({ message: 'orderId and amountPaid are required' });
    }

    const order = await getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const { payment, order: updatedOrder } = await recordPayment(orderId, {
      method: 'easypaisa',
      amountPaid,
      transactionId,
      status: status || 'confirmed'
    });

    res.json({ ok: true, payment, order: updatedOrder });
  } catch (error) {
    next(error);
  }
});

export default router;

