import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const success = await login(username, password);
            if (success) {
                navigate('/admin/dashboard');
            } else {
                setError('Invalid username or password');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex transition-colors duration-500">
            {/* Left Column - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32 relative z-10 bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
                
                <div className="max-w-md w-full mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="mb-12">
                        <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-blue/30 transform -rotate-3 hover:rotate-0 transition-transform duration-300 mb-8">
                            <ShieldCheck size={32} className="text-white transform rotate-3 hover:rotate-0" />
                        </div>
                        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
                            Welcome Back
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">
                            Please sign in to your admin account to manage the E2F Holidays portal.
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm font-medium mb-8 flex items-center gap-3 animate-pulse">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">Username</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-blue transition-colors">
                                    <User size={20} />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:bg-white dark:focus:bg-[#1a1a1a] focus:border-brand-blue dark:focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 outline-none transition-all duration-300"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-blue transition-colors">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:bg-white dark:focus:bg-[#1a1a1a] focus:border-brand-blue dark:focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 outline-none transition-all duration-300"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-[0.98] flex items-center justify-center group"
                            >
                                {isLoading ? (
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                    
                    <div className="mt-12 text-center text-gray-500 text-sm">
                        <p>© {new Date().getFullYear()} E2F Holidays. All rights reserved.</p>
                    </div>
                </div>
            </div>

            {/* Right Column - 4K Image */}
            <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-black">
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 hover:scale-100 transition-transform duration-[20s] ease-out" 
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=100&w=3840&auto=format&fit=crop')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-16 text-white transform translate-y-4 hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-4xl font-black mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">Discover The World</h3>
                    <p className="text-lg text-gray-300 max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">Manage beautiful destinations, exclusive packages, and unforgettable experiences for your clients.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
