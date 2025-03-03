import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './pages/HomeScreen';
import ProductScreen from './pages/ProductScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import ProductListScreen from './pages/ProductListScreen';
import ProductEditScreen from './pages/ProductEditScreen';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-grow py-3">
                        <div className="container mx-auto px-4">
                            <Routes>
                                <Route path="/" element={<HomeScreen />} />
                                <Route
                                    path="/product/:id"
                                    element={<ProductScreen />}
                                />
                                <Route
                                    path="/login"
                                    element={<LoginScreen />}
                                />
                                <Route
                                    path="/register"
                                    element={<RegisterScreen />}
                                />
                                <Route
                                    path="/admin/productlist"
                                    element={<ProductListScreen />}
                                />
                                <Route
                                    path="/admin/product/:id/edit"
                                    element={<ProductEditScreen />}
                                />
                                <Route
                                    path="/search/:keyword"
                                    element={<HomeScreen />}
                                />
                                <Route
                                    path="/page/:pageNumber"
                                    element={<HomeScreen />}
                                />
                                <Route
                                    path="/search/:keyword/page/:pageNumber"
                                    element={<HomeScreen />}
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
