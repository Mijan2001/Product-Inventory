import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { LogIn } from 'lucide-react';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const { login, isAuthenticated } = useContext(AuthContext);

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirect);
        }
    }, [navigate, isAuthenticated, redirect]);

    const submitHandler = async e => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);

            const { data } = await axios.post(
                'http://localhost:5000/api/users/login',
                {
                    email,
                    password
                }
            );

            login(data);
            setLoading(false);
            navigate(redirect);
        } catch (err) {
            setError(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : 'An unexpected error occurred'
            );
            setLoading(false);
        }
    };

    return (
        <FormContainer>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>

                {error && <Message variant="error">{error}</Message>}
                {loading && <Loader />}

                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center"
                        disabled={loading}
                    >
                        <LogIn size={18} className="mr-2" />
                        Sign In
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p>
                        New Customer?{' '}
                        <Link
                            to={
                                redirect
                                    ? `/register?redirect=${redirect}`
                                    : '/register'
                            }
                            className="text-blue-600 hover:text-blue-800"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </FormContainer>
    );
};

export default Login;
