import express from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    searchProducts,
    updateProduct,
    deleteProduct,
    getProductCategories
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// public rotes==============
router.get('/', getProducts);
router.get('/search', searchProducts);
router.get('/:id', getProductById);
router.get('/categories', getProductCategories);

// protected routes==============
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

export default router;
