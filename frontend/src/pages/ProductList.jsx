import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, Edit, Trash2, AlertCircle } from 'lucide-react';
import Loader from '../components/Loader';
import Message from '../components/Message';
import AuthContext from '../context/AuthContext';

const BACKEND_URL =
    'https://product-inventory-2.onrender.com' || 'http://localhost:5000';
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user || !user?.isAdmin) {
            navigate('/login');
            return;
        }

        const fetchProducts = async () => {
            try {
                setLoading(true);
                const config = {
                    headers: {
                        Authorization: `Bearer ${user?.token}`
                    }
                };
                const { data } = await axios.get(
                    `${BACKEND_URL}/api/products`,
                    config
                );
                setProducts(data.products);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, [navigate, user]);

    const deleteHandler = async id => {
        try {
            setDeleteLoading(true);
            setDeleteError(null);

            const config = {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            };

            await axios.delete(`${BACKEND_URL}/api/products/${id}`, config);

            setProducts(products.filter(product => product?._id !== id));
            setSuccessMessage('Product deleted successfully');
            setDeleteLoading(false);
            setShowDeleteModal(false);

            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (err) {
            setDeleteError('Failed to delete product');
            setDeleteLoading(false);
        }
    };

    const openDeleteModal = id => {
        setProductToDelete(id);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setProductToDelete(null);
        setShowDeleteModal(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Products</h1>
                <Link
                    to="/admin/product/create"
                    className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                >
                    <Plus size={18} />
                    <span>Add Product</span>
                </Link>
            </div>

            {successMessage && (
                <Message variant="success">{successMessage}</Message>
            )}

            {deleteError && <Message variant="error">{deleteError}</Message>}

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="error">{error}</Message>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Stock
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products.map(product => (
                                    <tr key={product?._id}>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {product?._id}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {product?.name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            ${product?.price.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {product?.category}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {product?.stock}
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <Link
                                                    to={`/admin/product/${product?._id}/edit`}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        deleteHandler(
                                                            product?._id
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
