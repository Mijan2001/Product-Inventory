import React from 'react';
import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
    if (pages <= 1) {
        return null;
    }

    return (
        <div className="flex justify-center mt-6">
            <ul className="flex space-x-1">
                {[...Array(pages).keys()].map(x => (
                    <li key={x + 1}>
                        <Link
                            to={
                                !isAdmin
                                    ? keyword
                                        ? `/search/${keyword}/page/${x + 1}`
                                        : `/page/${x + 1}`
                                    : `/admin/productlist/${x + 1}`
                            }
                            className={`px-3 py-1 rounded ${
                                x + 1 === page
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                        >
                            {x + 1}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Paginate;
