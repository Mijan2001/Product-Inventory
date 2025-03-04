import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Search,
    ShoppingBag,
    User,
    LogOut,
    Menu,
    X,
    Package
} from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Header = () => {
    const { user, logout, isAuthenticated } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
            setKeyword('');
        } else {
            navigate('/');
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-2">
                        <ShoppingBag size={24} />
                        <span className="text-xl font-bold">
                            Inventory Manager
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <div
                                    className="relative group "
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    {/* Profile Button */}
                                    <button className="flex items-center space-x-1 bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200">
                                        <User
                                            size={18}
                                            className="text-gray-700"
                                        />
                                        <span className="text-gray-700">
                                            {user?.name || 'User'}
                                        </span>
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transform transition duration-200">
                                            {/* Profile Link */}
                                            <Link
                                                to="/profile"
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                <User size={16} /> Profile
                                            </Link>

                                            {/* Admin: Product List */}
                                            {user?.isAdmin && (
                                                <Link
                                                    to="/admin/productlist"
                                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    <Package size={16} />{' '}
                                                    Products
                                                </Link>
                                            )}

                                            {/* Logout Button */}
                                            <button
                                                onClick={logout}
                                                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                <LogOut size={16} /> Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center space-x-1"
                            >
                                <User size={18} />
                                <span>Sign In</span>
                            </Link>
                        )}
                    </div>

                    <button className="md:hidden" onClick={toggleMenu}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-3 space-y-3">
                        {isAuthenticated ? (
                            <div className="space-y-2">
                                <p className="font-medium">{user?.name}</p>
                                <Link
                                    to="/profile"
                                    className="block py-2 text-gray-300 hover:text-white"
                                >
                                    Profile
                                </Link>
                                {user?.isAdmin && (
                                    <Link
                                        to="/admin/productlist"
                                        className="block py-2 text-gray-300 hover:text-white"
                                    >
                                        Products
                                    </Link>
                                )}
                                <button
                                    onClick={logout}
                                    className="flex items-center space-x-1 py-2 text-gray-300 hover:text-white"
                                >
                                    <LogOut size={18} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center space-x-1 py-2 text-gray-300 hover:text-white"
                            >
                                <User size={18} />
                                <span>Sign In</span>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
