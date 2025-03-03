import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Save } from 'lucide-react';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import AuthContext from '../context/AuthContext';

const ProductEditScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        category: '',
        stock: 0,
        description: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [errorUpdate, setErrorUpdate] = useState(null);
    const [successUpdate, setSuccessUpdate] = useState(false);

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/login');
            return;
        }

        const fetchProduct = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(
                    `http://localhost:5000/api/products/${id}`
                );
                setFormData({
                    name: data.name,
                    price: data.price,
                    category: data.category,
                    stock: data.stock,
                    description: data.description || ''
                });
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch product details');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, navigate, user]);

    const handleChange = e => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: name === 'price' || name === 'stock' ? Number(value) : value
        });
    };

    const submitHandler = async e => {
        e.preventDefault();

        try {
            setLoadingUpdate(true);
            setErrorUpdate(null);

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user?.token}`
                }
            };

            await axios.put(
                `http://localhost:5000/api/products/${id}`,
                formData,
                config
            );

            setSuccessUpdate(true);
            setLoadingUpdate(false);

            // Redirect after 2 seconds
            setTimeout(() => {
                navigate('/admin/productlist');
            }, 2000);
        } catch (err) {
            setErrorUpdate('Failed to update product');
            setLoadingUpdate(false);
        }
    };

    return (
        <div>
            <button
                onClick={() => navigate('/admin/productlist')}
                className="flex items-center space-x-1 mb-4 text-blue-600 hover:text-blue-800"
            >
                <ArrowLeft size={18} />
                <span>Go Back</span>
            </button>

            <FormContainer>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant="error">{error}</Message>
                    ) : (
                        <>
                            {loadingUpdate && <Loader />}
                            {errorUpdate && (
                                <Message variant="error">{errorUpdate}</Message>
                            )}
                            {successUpdate && (
                                <Message variant="success">
                                    Product updated successfully
                                </Message>
                            )}

                            <form onSubmit={submitHandler}>
                                <div className="mb-4">
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="price"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                        required
                                        min="0"
                                        step="0.01"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="category"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="stock"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Stock
                                    </label>
                                    <input
                                        type="number"
                                        id="stock"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                        required
                                        min="0"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center"
                                    disabled={loadingUpdate}
                                >
                                    <Save size={18} className="mr-2" />
                                    Update
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </FormContainer>
        </div>
    );
};

export default ProductEditScreen;
