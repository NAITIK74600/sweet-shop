import express from 'express';
import { body } from 'express-validator';
import {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
} from '../controllers/sweet.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Create sweet
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer')
  ],
  createSweet
);

// Get all sweets
router.get('/', getAllSweets);

// Search sweets
router.get('/search', searchSweets);

// Update sweet
router.put('/:id', updateSweet);

// Delete sweet (admin only)
router.delete('/:id', authorize('admin'), deleteSweet);

// Purchase sweet
router.post(
  '/:id/purchase',
  [body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')],
  purchaseSweet
);

// Restock sweet (admin only)
router.post(
  '/:id/restock',
  authorize('admin'),
  [body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')],
  restockSweet
);

export default router;
