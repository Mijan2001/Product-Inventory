import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
                <Link to={`/product/${product._id}`}>
                    <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 truncate">
                        {product.name}
                    </h2>
                </Link>
                <div className="mt-2 flex justify-between items-center">
                    <span className="text-gray-600">{product.category}</span>
                    <span className="font-bold text-gray-800">
                        ${product.price.toFixed(2)}
                    </span>
                </div>
                <div className="mt-2">
                    <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                            product.stock > 10
                                ? 'bg-green-100 text-green-800'
                                : product.stock > 0
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                        }`}
                    >
                        {product.stock > 10
                            ? 'In Stock'
                            : product.stock > 0
                            ? 'Low Stock'
                            : 'Out of Stock'}
                    </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {product.description}
                </p>
                <div className="mt-3">
                    <Link
                        to={`/product/${product._id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Product;
