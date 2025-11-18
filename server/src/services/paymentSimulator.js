export function simulateEasypaisaPayment({ order, amountPaid }) {
  const amountAsNumber = Number(amountPaid);
  const expectedAmount = Number(order.amount);

  if (Number.isNaN(amountAsNumber)) {
    throw new Error('Amount paid must be a valid number');
  }

  const delta = Math.abs(expectedAmount - amountAsNumber);
  const isExact = delta < 1; // allow ±1 PKR margin for rounding

  return {
    status: isExact ? 'confirmed' : 'pending-review',
    message: isExact
      ? 'Payment auto-confirmed (simulated).'
      : 'Amount mismatch; manual review required.',
    autoApproved: isExact
  };
}

