import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, LogOut, Menu, X } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Header = () => {
    const { user, logout, isAuthenticated } = useContext(AuthContext);
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

                    <div className="hidden md:block">
                        <form onSubmit={submitHandler} className="flex">
                            <input
                                type="text"
                                name="q"
                                onChange={e => setKeyword(e.target.value)}
                                value={keyword}
                                placeholder="Search Products..."
                                className="px-3 py-1 rounded-l text-black"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 px-3 py-1 rounded-r flex items-center"
                            >
                                <Search size={18} />
                            </button>
                        </form>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <div className="relative group">
                                    <button className="flex items-center space-x-1">
                                        <User size={18} />
                                        <span>{user?.name}</span>
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Profile
                                        </Link>
                                        {user?.isAdmin && (
                                            <Link
                                                to="/admin/productlist"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Products
                                            </Link>
                                        )}
                                        <button
                                            onClick={logout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </div>
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
                        <form onSubmit={submitHandler} className="flex">
                            <input
                                type="text"
                                name="q"
                                onChange={e => setKeyword(e.target.value)}
                                value={keyword}
                                placeholder="Search Products..."
                                className="px-3 py-1 rounded-l flex-grow text-black"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 px-3 py-1 rounded-r flex items-center"
                            >
                                <Search size={18} />
                            </button>
                        </form>

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
