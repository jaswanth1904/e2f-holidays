import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Lock, User } from 'lucide-react';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const success = await login(username, password);
        if (success) {
            navigate('/admin/dashboard');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-800">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-brand-blue mb-2">Admin Portal</h2>
                    <p className="text-gray-500 dark:text-gray-400">Sign in to manage E2F Holidays</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-medium mb-6 text-center border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="text-xs font-bold uppercase text-gray-400 ml-1">Username</label>
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                <User size={18} />
                            </div>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-blue outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold uppercase text-gray-400 ml-1">Password</label>
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                <Lock size={18} />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-blue outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-brand-blue hover:bg-brand-dark text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
