import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Product from './pages/Product';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import ProductEdit from './pages/ProductEdit';
import { AuthProvider } from './context/AuthContext';
import ProductCreate from './pages/ProductCreate';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-grow py-3">
                        <div className="container mx-auto px-4">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route
                                    path="/product/:id"
                                    element={<Product />}
                                />
                                <Route path="/login" element={<Login />} />
                                <Route
                                    path="/register"
                                    element={<Register />}
                                />
                                <Route path="/profile" element={<Profile />} />
                                <Route
                                    path="/profile/edit"
                                    element={<EditProfile />}
                                />
                                <Route
                                    path="/admin/productlist"
                                    element={<ProductList />}
                                />
                                <Route
                                    path="/admin/product/create"
                                    element={<ProductCreate />}
                                />
                                <Route
                                    path="/admin/product/:id/edit"
                                    element={<ProductEdit />}
                                />

                                <Route
                                    path="/page/:pageNumber"
                                    element={<Home />}
                                />
                                <Route
                                    path="/search/:keyword/page/:pageNumber"
                                    element={<Home />}
                                />
                            </Routes>
                        </div>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
