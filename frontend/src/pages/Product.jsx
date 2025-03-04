import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Edit } from 'lucide-react';
import Loader from '../components/Loader';
import Message from '../components/Message';
import AuthContext from '../context/AuthContext';

const BACKEND_URL =
    'https://product-inventory-2.onrender.com' || 'http://localhost:5000';
const Product = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(
                    `${BACKEND_URL}/api/products/${id}`
                );
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError('Product not found');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <button
                onClick={goBack}
                className="flex items-center space-x-1 mb-4 text-blue-600 hover:text-blue-800"
            >
                <ArrowLeft size={18} />
                <span>Go Back</span>
            </button>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="error">{error}</Message>
            ) : product ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                        <div className="flex justify-between items-start">
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                {product.name}
                            </h1>
                            {user?.isAdmin && (
                                <button
                                    onClick={() =>
                                        navigate(
                                            `/admin/product/${product._id}/edit`
                                        )
                                    }
                                    className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                >
                                    <Edit size={16} />
                                    <span>Edit</span>
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div>
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold mb-2">
                                        Product Details
                                    </h3>
                                    <p className="text-gray-700 mb-4">
                                        {product.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Category
                                            </p>
                                            <p className="font-medium">
                                                {product.category}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Added On
                                            </p>
                                            <p className="font-medium">
                                                {new Date(
                                                    product.createdAt
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded">
                                <div className="border-b pb-4 mb-4">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">
                                            Price:
                                        </span>
                                        <span className="font-bold text-xl">
                                            ${product.price.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Status:
                                        </span>
                                        <span
                                            className={`font-medium ${
                                                product.stock > 0
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                            }`}
                                        >
                                            {product.stock > 0
                                                ? 'In Stock'
                                                : 'Out of Stock'}
                                        </span>
                                    </div>
                                </div>

                                {product.stock > 0 && (
                                    <div className="mb-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">
                                                Quantity in Stock:
                                            </span>
                                            <span className="font-medium">
                                                {product.stock}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Product;
