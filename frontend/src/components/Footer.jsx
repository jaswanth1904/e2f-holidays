import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import axios from 'axios';
import LogoImg from '../assets/E2F Holidays Logo.png';

const Footer = () => {
    const [settings, setSettings] = useState({
        contactPhone: '+91 96428 10644',
        contactEmail: 'e2fhoildays@gmail.com',
        socialLinks: {},
        logo: LogoImg
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/settings`);
                if (data) {
                    setSettings({
                        contactPhone: '+91 96428 10644', // Forced as per request
                        contactEmail: 'e2fhoildays@gmail.com', // Forced as per request
                        socialLinks: data.socialLinks || {},
                        logo: data.logo || LogoImg
                    });
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
            }
        };
        fetchSettings();
    }, []);

    return (
        <footer className="bg-slate-900 text-white py-8 px-6 md:px-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 mb-8 relative z-10">
                {/* Brand & Copyright */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12">
                            <img src={settings.logo} alt="E2F Holidays Logo" className="w-full h-full object-contain" />
                        </div>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="font-bold text-xl tracking-wider text-white hover:text-sky-400 transition-colors cursor-pointer"
                        >
                            E2F Holidays
                        </button>
                    </div>
                </div>

                {/* Navigation & Legal */}
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-sky-400 uppercase tracking-widest text-[10px] mb-1">Company</h3>
                    <ul className="flex flex-col gap-1 text-sm text-gray-400">
                        <li><Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Home</Link></li>
                        <li><Link to="/#about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link to="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
                        <li><Link to="/privacy" className="hover:text-white transition-colors text-brand-yellow font-bold">Privacy & Terms</Link></li>
                        <li><Link to="/privacy#refund-policy" className="hover:text-white transition-colors">No Refund Policy</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-sky-400 uppercase tracking-widest text-[10px] mb-1">Contact Us</h3>
                    <a href={`https://wa.me/919642810644`} target="_blank" rel="noopener noreferrer" className="font-medium text-white hover:text-[#25D366] transition-colors text-sm flex items-center gap-2">
                        <span>📱 Call/WhatsApp: +91 96428 10644</span>
                    </a>
                    <a href={`mailto:e2fhoildays@gmail.com`} className="font-medium text-white hover:text-sky-300 transition-colors text-sm">
                        📩 Email: e2fhoildays@gmail.com
                    </a>
                </div>

                {/* Socials & Button */}
                <div className="flex flex-col gap-3 items-start md:items-end">
                    <Link to="/#packages" className="bg-white text-slate-900 px-4 py-1.5 rounded-full font-bold flex items-center gap-2 hover:bg-sky-50 transition-colors shadow-lg text-xs">
                        <span>Book a Trip</span>
                    </Link>
                    <div className="flex gap-3">
                        {settings.socialLinks.instagram && <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-white transition-colors"><Instagram size={18} /></a>}
                        {settings.socialLinks.twitter && <a href={settings.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-white transition-colors"><Twitter size={18} /></a>}
                        {settings.socialLinks.facebook && <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-white transition-colors"><Facebook size={18} /></a>}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 mb-4 text-[10px] text-gray-500 border-t border-slate-800 pt-4">
                &copy; {new Date().getFullYear()} E2F Holidays. All rights reserved.
            </div>

            {/* Massive Footer Text */}
            <div className="w-full relative flex justify-center leading-none select-none">
                <h1
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-[10vw] md:text-[8vw] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#138808] opacity-80 tracking-tighter w-full text-center leading-tight whitespace-nowrap drop-shadow-2xl cursor-pointer hover:opacity-100 transition-opacity"
                >
                    E2F HOLIDAYS
                </h1>
            </div>
        </footer>
    );
};

export default Footer;
