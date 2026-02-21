import { Link } from 'react-router-dom';
import { Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white py-8 px-6 md:px-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 mb-8 relative z-10">
                {/* Brand & Copyright */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="font-bold text-lg tracking-wider text-white hover:text-sky-400 transition-colors cursor-pointer"
                        >
                            E2F Holidays
                        </button>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-sky-400 uppercase tracking-widest text-[10px] mb-1">Navigation</h3>
                    <ul className="flex flex-col gap-1 text-sm text-gray-400">
                        <li><Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Home</Link></li>
                        <li><Link to="/#blog" className="hover:text-white transition-colors">Blog</Link></li>
                        <li><Link to="/#about" className="hover:text-white transition-colors">About</Link></li>
                        <li><Link to="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
                        <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                    </ul>
                </div>

                {/* Contact Email */}
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-sky-400 uppercase tracking-widest text-[10px] mb-1">Email</h3>
                    <a href="mailto:hello@e2fholidays.com" className="font-medium text-white hover:text-sky-300 transition-colors text-sm">
                        hello@e2fholidays.com
                    </a>
                </div>

                {/* Socials & Button */}
                <div className="flex flex-col gap-3 items-start md:items-end">
                    <Link to="/#packages" className="bg-white text-slate-900 px-4 py-1.5 rounded-full font-bold flex items-center gap-2 hover:bg-sky-50 transition-colors shadow-lg text-xs">
                        <span>Book a Trip</span>
                    </Link>
                    <div className="flex gap-3">
                        <a href="#" className="text-sky-400 hover:text-white transition-colors"><Instagram size={18} /></a>
                        <a href="#" className="text-sky-400 hover:text-white transition-colors"><Twitter size={18} /></a>
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
