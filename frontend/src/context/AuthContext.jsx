import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
    isAuthenticated: false
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const parsedUser = JSON.parse(userInfo);
            setUser(parsedUser);
            setIsAuthenticated(true);
        }
    }, []);

    const login = userData => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('userInfo', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('userInfo');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
