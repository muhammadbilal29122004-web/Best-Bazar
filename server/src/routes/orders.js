import { Router } from 'express';
import { createOrder, getOrderById } from '../services/orderStore.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const { items, amount, customer } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items array is required' });
    }

    const order = await createOrder({
      items: items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice
      })),
      amount,
      customer
    });

    res.status(201).json({ order });
  } catch (error) {
    next(error);
  }
});

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await getOrderById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ order });
  } catch (error) {
    next(error);
  }
});

export default router;

