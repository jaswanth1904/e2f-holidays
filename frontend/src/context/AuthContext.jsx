import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const adminInfo = localStorage.getItem('adminInfo');
        if (adminInfo) {
            setAdmin(JSON.parse(adminInfo));
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/login`, { username, password }, config);
            setAdmin(data);
            localStorage.setItem('adminInfo', JSON.stringify(data));
            return true;
        } catch (error) {
            console.error("Backend Error:", error);
            return false;
        }
    };

    const updateCredentials = async (newUsername, currentPassword, newPassword) => {
        try {
            const config = { 
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${admin.token}`
                } 
            };
            const { data } = await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/update`, { 
                newUsername, 
                currentPassword, 
                newPassword 
            }, config);
            setAdmin(data);
            localStorage.setItem('adminInfo', JSON.stringify(data));
            return { success: true };
        } catch (error) {
            console.error("Backend Error:", error);
            return { success: false, message: error.response?.data?.message || 'Update failed' };
        }
    };

    const logout = () => {
        setAdmin(null);
        localStorage.removeItem('adminInfo');
    };

    return (
        <AuthContext.Provider value={{ admin, login, logout, updateCredentials, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
