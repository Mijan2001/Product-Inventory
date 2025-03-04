import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { User, Mail, Shield, Save, LogOut } from 'lucide-react';

const BACKEND_URL =
    'https://product-inventory-2.onrender.com' || 'http://localhost:5000';

const EditProfile = () => {
    const { user, logout, login, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    // State for form fields
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Redirect if not authenticated
    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         navigate('/login');
    //     }
    // }, [isAuthenticated, navigate]);

    // Handle Form Submit
    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data } = await axios.post(
                `${BACKEND_URL}/api/users/profile/edit`,
                { name, email, isAdmin },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user?.token}`
                    }
                }
            );

            // Update user context and local storage
            login(data);
            localStorage.removeItem('userInfo');
            localStorage.setItem('userInfo', JSON.stringify(data));

            setLoading(false);
            navigate('/admin/productlist');
        } catch (err) {
            setError(err.response?.data?.message || 'Error updating profile');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-32 bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">
                Edit Profile
            </h2>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Name */}
                <div className="flex items-center gap-2 border p-2 rounded-md">
                    <User className="text-gray-500" />
                    <input
                        type="text"
                        className="w-full outline-none"
                        placeholder="Full Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                {/* Email */}
                <div className="flex items-center gap-2 border p-2 rounded-md">
                    <Mail className="text-gray-500" />
                    <input
                        type="email"
                        className="w-full outline-none"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                {/* Admin Toggle (Only Admins Can See This) */}
                {user?.isAdmin !== null && (
                    <label className="flex items-center gap-2 cursor-pointer">
                        <Shield className="text-gray-500" />
                        <input
                            type="checkbox"
                            checked={isAdmin}
                            onChange={e => setIsAdmin(e.target.checked)}
                            className="accent-blue-500"
                        />
                        <span>Admin</span>
                    </label>
                )}

                {/* Save Button */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600 transition disabled:opacity-50"
                    disabled={loading}
                >
                    <Save className="w-5 h-5" />
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>

                {/* Logout Button */}
                <button
                    onClick={() => {
                        logout();
                        navigate('/login');
                    }}
                    className="mt-2 px-4 py-2 bg-red-500 text-white  rounded-md flex items-center gap-2 hover:bg-red-600 transition"
                >
                    <LogOut className="w-5 h-5" /> Logout
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
