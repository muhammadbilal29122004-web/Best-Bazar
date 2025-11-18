import { Router } from 'express';
import { db } from '../config/db.js';

const router = Router();

router.get('/', async (_req, res) => {
  let dbStatus = 'disabled';
  if (db.enabled) {
    try {
      await db.query('SELECT 1');
      dbStatus = 'connected';
    } catch (error) {
      dbStatus = `error: ${error.message}`;
    }
  }

  res.json({
    ok: true,
    service: 'new-valve-api',
    db: dbStatus,
    timestamp: new Date().toISOString()
  });
});

export default router;

