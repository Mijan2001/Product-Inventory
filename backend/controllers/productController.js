import mongoose from 'mongoose';
import Product from '../models/Product.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
        ? {
              name: {
                  $regex: req.query.keyword,
                  $options: 'i'
              }
          }
        : {};

    const category = req.query?.category
        ? { category: req.query?.category }
        : {};

    const sortOption = {};
    if (req.query.sortBy) {
        sortOption[req.query.sortBy] = req.query.sortOrder === 'desc' ? -1 : 1;
    } else {
        sortOption.createdAt = -1; // Default sort by newest
    }

    const count = await Product.countDocuments({ ...keyword, ...category });
    const products = await Product.find({ ...keyword, ...category })
        .sort(sortOption)
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({
        products,
        page,
        pages: Math.ceil(count / pageSize),
        totalProducts: count
    });
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await Product.findById(req.params?.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    const { name, price, description, category, stock } = req.body;

    const product = new Product({
        name,
        price,
        description,
        category,
        stock
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        const { name, price, description, category, stock } = req.body;

        // Update product using findByIdAndUpdate
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { $set: { name, price, description, category, stock } },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params?.id)) {
        return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await Product.findById(req.params?.id);

    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.json({ message: 'Product removed' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

// @desc    Get product categories
// @route   GET /api/products/categories
// @access  Public
const getProductCategories = async (req, res) => {
    const categories = await Product.distinct('category');
    res.json(categories);
};

export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductCategories
};
