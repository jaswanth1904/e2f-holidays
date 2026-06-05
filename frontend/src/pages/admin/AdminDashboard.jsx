import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {
    LogOut,
    Settings as SettingsIcon,
    Shield,
    Menu,
    X,
    LayoutTemplate,
    Image as ImageIcon,
    Briefcase,
    MessageSquare,
    Link as LinkIcon,
    ChevronRight,
    Clock,
    Heart
} from 'lucide-react';
import { ToastProvider } from '../../components/ui/ToastProvider';
import LogoImg from '../../assets/E2F Holidays Logo.png';

// Import Tabs
import AdminSettings from './tabs/AdminSettings';
import AdminHeader from './tabs/AdminHeader';
import AdminHero from './tabs/AdminHero';
import AdminServices from './tabs/AdminServices';
import AdminTestimonials from './tabs/AdminTestimonials';
import AdminFooter from './tabs/AdminFooter';
import AdminCredentials from './tabs/AdminCredentials';
import AdminAnalytics from './tabs/AdminAnalytics';
import AdminPackages from './tabs/AdminPackages';

const DashboardContent = () => {
    const { admin, logout, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('analytics');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        if (!loading && !admin) {
            navigate('/', { replace: true });
        }
    }, [admin, loading, navigate]);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const dailyMessages = [
        "Hope you have a fantastic day!",
        "You're doing great work today!",
        "Remember to take a deep breath and smile.",
        "Making the world smaller, one trip at a time.",
        "Your efforts make unforgettable holidays possible."
    ];
    const todayMessage = dailyMessages[new Date().getDay() % dailyMessages.length];

    if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
    if (!admin) return null;

    const tabs = [
        { id: 'analytics', label: 'Overview / Analytics', icon: LayoutTemplate },
        { id: 'packages', label: 'Holiday Packages', icon: Briefcase },
        { id: 'settings', label: 'Global Settings', icon: SettingsIcon },
        { id: 'header', label: 'Header / Navigation', icon: LayoutTemplate },
        { id: 'hero', label: 'Hero Section', icon: ImageIcon },
        { id: 'services', label: 'Services & Experience', icon: Briefcase },
        { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
        { id: 'footer', label: 'Footer Links', icon: LinkIcon },
        { id: 'account', label: 'Admin Credentials', icon: Shield },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'analytics': return <AdminAnalytics />;
            case 'packages': return <AdminPackages />;
            case 'settings': return <AdminSettings />;
            case 'header': return <AdminHeader />;
            case 'hero': return <AdminHero />;
            case 'services': return <AdminServices />;
            case 'testimonials': return <AdminTestimonials />;
            case 'footer': return <AdminFooter />;
            case 'account': return <AdminCredentials />;
            default: return <AdminAnalytics />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white flex flex-col md:flex-row font-sans">

            {/* Mobile Header */}
            <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
                <h1 className="font-bold text-xl text-[#2B4560] dark:text-blue-400">E2F CMS</h1>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`group fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 w-[280px] md:w-[88px] md:hover:w-[280px] bg-white dark:bg-[#111111] border-r border-gray-200 dark:border-gray-800 transition-[width,transform] duration-300 ease-in-out z-40 flex flex-col shadow-2xl md:shadow-none overflow-x-hidden`}>
                <div className="p-6 hidden md:block border-b border-gray-100 dark:border-gray-800 relative overflow-hidden">
                    {/* Vibrant background splash */}
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-2xl opacity-20"></div>

                    <div className="flex items-center gap-4 relative z-10 w-[280px]">
                        <div className="shrink-0 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-200">
                            <img src={LogoImg} alt="E2F Logo" className="w-full h-full object-contain p-1" />
                        </div>
                        <div className="md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            <h2 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 leading-tight">Admin Portal</h2>
                            <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest mt-0.5">Content Manager</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setIsSidebarOpen(false); }}
                            className={`w-full flex items-center justify-between px-3 md:px-4 py-3.5 rounded-xl transition-all duration-300 group/btn relative overflow-hidden ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-[#2B4560] to-[#1f3246] text-white shadow-md border border-[#2B4560]/50'
                                    : 'hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-[#2B4560] dark:hover:text-white border border-transparent'
                                }`}
                        >
                            {activeTab === tab.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400 rounded-r-md"></div>}
                            <div className="flex items-center gap-4 relative z-10 w-[200px]">
                                <div className="shrink-0 flex items-center justify-center w-6">
                                    <tab.icon size={20} className={activeTab === tab.id ? 'text-blue-300' : 'text-gray-400 group-hover/btn:text-[#2B4560] dark:group-hover/btn:text-blue-400 transition-colors'} />
                                </div>
                                <span className="font-semibold text-sm whitespace-nowrap md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">{tab.label}</span>
                            </div>
                            {activeTab === tab.id && <ChevronRight size={16} className="text-blue-300 relative z-10 shrink-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F8FAFC] dark:bg-[#0a0a0a]">

                {/* Desktop Top Bar */}
                <header className="hidden md:flex items-center justify-between bg-white dark:bg-[#111111] px-8 py-4 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 shadow-sm">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                            <span>Dashboard</span>
                            <ChevronRight size={14} className="mx-2 opacity-50" />
                            <span className="text-[#2B4560] dark:text-blue-400">{tabs.find(t => t.id === activeTab)?.label}</span>
                        </div>

                        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 hidden lg:block"></div>

                        <div className="hidden lg:flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                            <Clock size={16} className="text-blue-500" />
                            <span className="tabular-nums">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                        </div>

                        <div className="hidden xl:flex items-center gap-2 text-sm font-medium text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20 px-3 py-1.5 rounded-full border border-pink-100 dark:border-pink-800/50">
                            <Heart size={14} className="fill-current" />
                            <span>{todayMessage}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 text-sm">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800">
                                {admin.username.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-900 dark:text-white leading-tight">{admin.username}</span>
                                <span className="text-[10px] text-gray-500 uppercase font-semibold">Administrator</span>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-gray-200 dark:bg-gray-800"></div>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-lg transition-colors text-sm font-semibold"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                </header>

                {/* Main Scrollable Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white dark:bg-[#111111] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8 min-h-[600px] mb-8">
                            {renderTabContent()}
                        </div>
                    </div>
                </main>
            </div>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

const AdminDashboard = () => (
    <ToastProvider>
        <DashboardContent />
    </ToastProvider>
);

export default AdminDashboard;
