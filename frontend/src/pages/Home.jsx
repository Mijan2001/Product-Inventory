import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { Filter } from 'lucide-react';
const BACKEND_URL =
    'https://product-inventory-2.onrender.com' || 'http://localhost:5000';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { keyword, pageNumber } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const pageNum = pageNumber || '1';

                let url = `${BACKEND_URL}/api/products?pageNumber=${pageNum}`;

                if (keyword) {
                    url += `&keyword=${keyword}`;
                }

                if (selectedCategory) {
                    url += `&category=${selectedCategory}`;
                }

                url += `&sortBy=${sortBy}&sortOrder=${sortOrder}`;

                const { data } = await axios.get(url);

                setProducts(data?.products);
                setPage(data.page);
                setPages(data.pages);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products');
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const { data } = await axios.get(
                    `${BACKEND_URL}/api/products/categories`
                );
                setCategories(data);
            } catch (err) {
                console.error('Failed to fetch categories');
            }
        };

        fetchProducts();
        fetchCategories();
    }, [keyword, pageNumber, selectedCategory, sortBy, sortOrder]);

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    // fetch products by search
    const fetchProductsBySearch = async () => {
        if (!searchQuery) return; // Don't fetch if search query is empty

        const searchKeyWords = searchQuery.toLowerCase();

        try {
            console.log('Searching for:', searchKeyWords);
            const { data } = await axios.get(
                `${BACKEND_URL}/api/products/search?keyword=${searchKeyWords}`
            );
            console.log('data======', data);
            setProducts(data); // Set data directly, since backend returns an array
        } catch (error) {
            console.log('mijan');
            console.error('Error fetching search results:', error);
            setError('Failed to fetch search results');
        }
        setLoading(false);
    };

    const handleSearchChange = e => {
        setSearchQuery(e.target.value);
        console.log('searchQuery == ', searchQuery);
    };

    useEffect(() => {
        console.log('search ===', searchQuery);
        fetchProductsBySearch();
    }, [searchQuery]);

    return (
        <div>
            {/* Search Bar */}
            <div className="mb-6 flex justify-center w-full">
                <div className="flex items-center w-full md:w-3/5 space-x-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search products..."
                        className="p-2 w-full max-w-md border rounded"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Header and Filter Button */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Latest Products</h1>
                <button
                    onClick={toggleFilters}
                    className="flex items-center space-x-1 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                >
                    <Filter size={18} />
                    <span>Filters</span>
                </button>
            </div>

            {/* Filter Section */}
            {showFilters && (
                <div className="bg-gray-100 p-4 rounded mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={e =>
                                    setSelectedCategory(e.target.value)
                                }
                                className="w-full p-2 border rounded"
                            >
                                <option value="">All Categories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Sort By
                            </label>
                            <select
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                                className="w-full p-2 border rounded"
                            >
                                <option value="createdAt">Date Added</option>
                                <option value="name">Name</option>
                                <option value="price">Price</option>
                                <option value="stock">Stock</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Order
                            </label>
                            <select
                                value={sortOrder}
                                onChange={e => setSortOrder(e.target.value)}
                                className="w-full p-2 border rounded"
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Display Loading, Error, or Products */}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="error">{error}</Message>
            ) : (
                <>
                    {products?.length === 0 ? (
                        <Message>No products found</Message>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {products.map(product => (
                                    <Product
                                        key={product._id}
                                        product={product}
                                    />
                                ))}
                            </div>
                            <Paginate
                                pages={pages}
                                page={page}
                                keyword={keyword || ''}
                            />
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Home;
