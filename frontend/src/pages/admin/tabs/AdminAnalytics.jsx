import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Eye, 
    MousePointerClick, 
    TrendingUp,
    PackageSearch,
    MessageSquare,
    MapPin,
    Image as ImageIcon,
    Users
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const StatCard = ({ title, value, icon: Icon, trend, trendLabel, colorClass = "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30" }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent opacity-20 rounded-bl-full`}></div>
        <div className="flex justify-between items-start z-10 relative">
            <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold">{title}</p>
                <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-2">{value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${colorClass}`}>
                <Icon size={24} />
            </div>
        </div>
        {trend && (
            <div className="mt-4 flex items-center gap-2 text-sm z-10 relative">
                <span className={`font-semibold flex items-center gap-1 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    <TrendingUp size={16} className={trend < 0 ? 'rotate-180' : ''} />
                    {Math.abs(trend)}%
                </span>
                <span className="text-gray-500 dark:text-gray-400">{trendLabel}</span>
            </div>
        )}
    </div>
);

const AdminAnalytics = () => {
    const [stats, setStats] = useState({ packages: 0, testimonials: 0, services: 0 });
    const [activeVisitors, setActiveVisitors] = useState(0);
    const [recentInquiries, setRecentInquiries] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [pkgRes, testRes, srvRes, inqRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/packages`).catch(() => ({ data: [] })),
                    axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/testimonials`).catch(() => ({ data: [] })),
                    axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/features`).catch(() => ({ data: [] })),
                    axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/enquiries`, { withCredentials: true }).catch(() => ({ data: [] }))
                ]);
                setStats({
                    packages: pkgRes.data.length,
                    testimonials: testRes.data.length,
                    services: srvRes.data.length
                });
                if (inqRes.data && Array.isArray(inqRes.data)) {
                    setRecentInquiries(inqRes.data.slice(0, 10)); // Top 10 recent
                }
            } catch (error) {
                console.error("Failed to fetch stats", error);
            }
        };
        fetchStats();
    }, []);

    useEffect(() => {
        import('../../../socket').then(({ socket }) => {
            const onVisitorUpdate = (count) => setActiveVisitors(count);
            const onNewEnquiry = (enquiry) => {
                setRecentInquiries(prev => [enquiry, ...prev].slice(0, 10));
                // We could also show a toast here if ToastProvider is available, but the global AdminDashboard might be better
            };

            socket.on('visitor_count_updated', onVisitorUpdate);
            socket.on('new_enquiry', onNewEnquiry);

            return () => {
                socket.off('visitor_count_updated', onVisitorUpdate);
                socket.off('new_enquiry', onNewEnquiry);
            };
        });
    }, []);

    // Mock data for Recharts (Could be replaced with real data later)
    const chartData = [
        { name: 'Jan', views: 4000, inquiries: 240 },
        { name: 'Feb', views: 3000, inquiries: 139 },
        { name: 'Mar', views: 2000, inquiries: 980 },
        { name: 'Apr', views: 2780, inquiries: 390 },
        { name: 'May', views: 1890, inquiries: 480 },
        { name: 'Jun', views: 2390, inquiries: 380 },
    ];

    const pieData = [
        { name: 'Tour Packages', value: 45 },
        { name: 'Cruise Packages', value: 30 },
        { name: 'South India', value: 25 },
    ];
    const COLORS = ['#2B4560', '#3B82F6', '#10B981'];

    return (
        <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back! Here's a snapshot of your database and website traffic.</p>
                </div>
                <div className="flex items-center gap-3 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="relative">
                        <Users size={20} className="text-blue-600 dark:text-blue-400" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">Active Users Now</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white leading-none">{activeVisitors}</p>
                    </div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Page Views" value="12,450" icon={Eye} trend={12.5} trendLabel="vs last month" colorClass="text-purple-600 bg-purple-100 dark:bg-purple-900/30" />
                <StatCard title="Recent Inquiries" value="48" icon={MousePointerClick} trend={8.2} trendLabel="vs last month" colorClass="text-green-600 bg-green-100 dark:bg-green-900/30" />
                <StatCard title="Active Packages" value={stats.packages} icon={PackageSearch} colorClass="text-[#2B4560] bg-[#2B4560]/10 dark:text-blue-400 dark:bg-blue-900/30" />
                <StatCard title="Testimonials" value={stats.testimonials} icon={MessageSquare} colorClass="text-orange-600 bg-orange-100 dark:bg-orange-900/30" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Traffic Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden p-6 flex flex-col">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-6">Traffic & Inquiries (Last 6 Months)</h4>
                    <div className="flex-1 min-h-[250px]">
                        <ResponsiveContainer width="99%" height="100%">
                            <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="views" fill="#2B4560" radius={[4, 4, 0, 0]} name="Page Views" />
                                <Bar dataKey="inquiries" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Inquiries" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Pie Chart for Package Categories */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden p-6">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Inquiries by Category</h4>
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-center gap-4 mt-2">
                            {pieData.map((entry, index) => (
                                <div key={entry.name} className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300">
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }}></span>
                                    {entry.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions / System Health */}
                    <div className="bg-gradient-to-br from-[#2B4560] to-[#1f3246] rounded-2xl p-6 text-white shadow-md relative overflow-hidden flex flex-col justify-between h-[250px]">
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-5 rounded-full blur-3xl"></div>
                        <div>
                            <h4 className="font-bold text-lg mb-4 text-blue-100">Quick Actions</h4>
                            <div className="space-y-3 relative z-10">
                                <button className="w-full bg-white/10 hover:bg-white/20 text-left px-4 py-2.5 rounded-xl transition-colors font-medium text-sm flex items-center justify-between border border-white/5">
                                    Add New Package <PackageSearch size={16} />
                                </button>
                                <button className="w-full bg-white/10 hover:bg-white/20 text-left px-4 py-2.5 rounded-xl transition-colors font-medium text-sm flex items-center justify-between border border-white/5">
                                    Update Header Image <ImageIcon size={16} />
                                </button>
                            </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                            <div className="text-sm">
                                <p className="text-blue-200">System Status</p>
                                <p className="font-bold text-green-400 flex items-center gap-1 mt-1"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> All Systems Operational</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Recent Inquiries List */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                    <h4 className="font-bold text-gray-900 dark:text-white">Recent Inquiries</h4>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg">View All Leads</button>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {recentInquiries.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">No recent inquiries found.</div>
                    ) : (
                        recentInquiries.map((inquiry) => (
                            <div key={inquiry._id || inquiry.id} className="p-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800">
                                        {(inquiry.firstName || inquiry.name || 'U').charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">{inquiry.firstName} {inquiry.lastName}</p>
                                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                                            <MapPin size={12} className="text-[#2B4560] dark:text-blue-400" /> {inquiry.destination}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                                        inquiry.status === 'New' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400' :
                                        inquiry.status === 'Contacted' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:border-yellow-800 dark:text-yellow-400' :
                                        'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'
                                    }`}>
                                        {inquiry.status || 'New'}
                                    </span>
                                    <p className="text-xs text-gray-400 mt-1.5">{new Date(inquiry.createdAt || new Date()).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
