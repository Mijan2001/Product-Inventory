import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext'; // Adjust import based on your project structure

const BACKEND_URL =
    'https://product-inventory-2.onrender.com' || 'http://localhost:5000';
const ProductCreate = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        stock: '',
        description: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Handle input change
    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async e => {
        e.preventDefault();

        if (
            !formData.name ||
            !formData.price ||
            !formData.category ||
            !formData.stock
        ) {
            setError('All fields except description are required!');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user?.token}` // Ensure user token is sent
                }
            };

            await axios.post(`${BACKEND_URL}/api/products`, formData, config);

            setSuccess(true);
            setTimeout(() => {
                navigate('/admin/productlist'); // Redirect after successful creation
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create product');
        } finally {
            setLoading(false);
        }
    };

    if (!user || !user.isAdmin) {
        return (
            <div className="text-red-500 text-center mt-10">
                Unauthorized Access
            </div>
        );
    }

    return (
        <div className="max-w-lg mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">
                Create Product
            </h2>

            {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            {success && (
                <div className="text-green-500 text-sm text-center">
                    Product Created Successfully!
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-400 focus:border-none"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-400 focus:border-none"
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-400 focus:border-none"
                />
                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-400 focus:border-none"
                />
                <textarea
                    name="description"
                    placeholder="Description (optional)"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-400 focus:border-none"
                    rows="3"
                ></textarea>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create Product'}
                </button>
            </form>
        </div>
    );
};

export default ProductCreate;
