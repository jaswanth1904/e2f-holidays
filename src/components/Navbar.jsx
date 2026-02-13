import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Facebook, Twitter, Instagram, Linkedin, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';





const Navbar = ({ toggleDarkMode, isDarkMode }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-sans ${isScrolled
                ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-md py-3'
                : 'bg-white dark:bg-black py-5'
                }`}>
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center h-full">

                    {/* 1. Left: Cursive Logo */}
                    <a href="/" className="flex-shrink-0 z-50">
                        <h1 className="font-script text-4xl md:text-5xl text-brand-blue dark:text-white transition-colors duration-300 select-none">
                            E2F Holidays
                        </h1>
                    </a>

                    {/* 2. Center: Navigation Links (Hidden on Mobile) */}
                    <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-8">
                        {['About', 'Services', 'Testimonials', 'Blog', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`/#${item.toLowerCase().replace(' ', '-')}`}
                                className="text-[11px] font-bold tracking-[0.15em] uppercase text-gray-500 hover:text-brand-teal dark:text-gray-400 dark:hover:text-brand-yellow transition-colors duration-300"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* 3. Right: Socials & Theme Toggle */}
                    <div className="hidden lg:flex items-center gap-5">
                        <div className="flex items-center gap-4 border-r border-gray-200 dark:border-gray-800 pr-5 mr-1 text-gray-400 dark:text-gray-500">
                            <a href="#" className="hover:text-brand-blue dark:hover:text-white transition-colors"><Facebook size={16} /></a>
                            <a href="#" className="hover:text-brand-blue dark:hover:text-white transition-colors"><Twitter size={16} /></a>
                            <a href="#" className="hover:text-brand-blue dark:hover:text-white transition-colors"><Instagram size={16} /></a>
                            <a href="#" className="hover:text-brand-blue dark:hover:text-white transition-colors"><Linkedin size={16} /></a>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-full hover:bg-brand-blue/10 dark:hover:bg-white/10 text-gray-900 dark:text-white transition-all transform hover:rotate-12"
                                aria-label="Toggle Theme"
                            >
                                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-gray-900 dark:text-white z-50"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-white dark:bg-black pt-24 px-8 lg:hidden flex flex-col items-center"
                    >
                        <nav className="flex flex-col gap-8 text-center w-full">
                            {['About', 'Services', 'Testimonials', 'Blog', 'Contact'].map((item) => (
                                <a
                                    key={item}
                                    href={`/#${item.toLowerCase().replace(' ', '-')}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-lg font-bold tracking-widest uppercase text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-900 pb-4"
                                >
                                    {item}
                                </a>
                            ))}

                            <div className="mt-8 flex justify-center gap-8 text-gray-500">
                                <Facebook size={24} />
                                <Twitter size={24} />
                                <Instagram size={24} />
                            </div>

                            <button
                                onClick={() => { toggleDarkMode(); setIsMenuOpen(false); }}
                                className="mt-4 flex items-center justify-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-900 dark:text-white p-4 border border-gray-200 dark:border-gray-800 rounded-lg"
                            >
                                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                                Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
                            </button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
