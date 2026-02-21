import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sun, Moon, Menu, X, Search, Calendar, MapPin, Facebook, Twitter, Instagram, ChevronLeft, ChevronRight } from 'lucide-react'; // Added Chevrons
import { motion, AnimatePresence } from 'framer-motion';
import { cruisePackages, tourPackages } from '../data/packages';
import { southIndiaPackages } from '../data/southIndiaPackages';


const Navbar = ({ toggleDarkMode, isDarkMode }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Search & Date State
    const [selectedDate, setSelectedDate] = useState('');
    const [minDate, setMinDate] = useState('');

    // Custom Calendar State
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);

        // Set Today's Date
        const today = new Date();
        const dateString = today.toISOString().split('T')[0];
        setMinDate(dateString);
        setSelectedDate(dateString);
        setCurrentMonth(today);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = () => {
        if (!searchQuery.trim()) return;

        const query = searchQuery.toLowerCase();

        // Clear input immediately per user request
        setSearchQuery('');

        const allPackages = [...cruisePackages, ...tourPackages, ...southIndiaPackages];

        const match = allPackages.find(pkg =>
            pkg.title.toLowerCase().includes(query) ||
            pkg.destination?.toLowerCase().includes(query) ||
            pkg.destinations?.some(d => d.toLowerCase().includes(query))
        );

        if (match) {
            navigate(`/package/${match.id}`);
        } else {
            // Use setTimeout to allow the state update (clearing input) to render before alerting
            setTimeout(() => {
                alert("We apologize for the inconvenience, We couldn't find a package for your search.");
            }, 50);
        }
    };

    // Calendar Helpers
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun

        const daysArray = [];
        for (let i = 0; i < firstDay; i++) daysArray.push(null);
        for (let i = 1; i <= daysInMonth; i++) daysArray.push(new Date(year, month, i));
        return daysArray;
    };

    const changeMonth = (increment) => {
        const newDate = new Date(currentMonth);
        newDate.setMonth(newDate.getMonth() + increment);
        setCurrentMonth(newDate);
    };

    const isDateSelectable = (date) => {
        if (!date) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-sans ${isScrolled
                ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-md py-3'
                : 'bg-white dark:bg-black py-5'
                }`}>
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center h-full">

                    {/* 1. Left: Cursive Logo */}
                    <Link to="/" className="flex-shrink-0 z-50">
                        <h1 className="font-script text-4xl md:text-5xl text-brand-blue dark:text-white transition-colors duration-300 select-none">
                            E2F Holidays
                        </h1>
                    </Link>

                    {/* 2. Center: Navigation Links (Hidden on Mobile) */}
                    <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-8">
                        {['About', 'Services', 'Testimonials', 'Blog', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                to={`/#${item.toLowerCase().replace(' ', '-')}`}
                                className="text-[11px] font-bold tracking-[0.15em] uppercase text-gray-500 hover:text-brand-teal dark:text-gray-400 dark:hover:text-brand-yellow transition-colors duration-300"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>

                    {/* 3. Right: Search Widget & Theme Toggle */}
                    <div className="hidden lg:flex items-center gap-4">
                        {/* Search & Date Widget */}
                        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-1.5 border border-gray-200 dark:border-gray-700 shadow-sm transition-shadow hover:shadow-md">

                            {/* Premium Hover Dropdown Date Picker */}
                            <div className="relative group border-r border-gray-300 dark:border-gray-600 pr-4 mr-2">
                                {/* Trigger Label */}
                                <div className="flex items-center gap-2 cursor-pointer py-1 text-gray-600 dark:text-gray-300 group-hover:text-brand-blue transition-colors">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase tracking-wide whitespace-nowrap">
                                        {selectedDate === minDate ? "Plan Dates" : new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </span>
                                </div>

                                {/* Custom Calendar Dropdown */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                                    {/* Arrow Tip */}
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-900 border-l border-t border-gray-100 dark:border-gray-800 transform rotate-45"></div>

                                    {/* Header */}
                                    <div className="flex justify-between items-center mb-4 relative z-10">
                                        <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 transition-colors">
                                            <ChevronLeft size={16} />
                                        </button>
                                        <span className="font-bold text-sm text-gray-900 dark:text-white">
                                            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                        </span>
                                        <button onClick={() => changeMonth(1)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 transition-colors">
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>

                                    {/* Weekdays */}
                                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                                            <span key={d} className="text-[10px] text-gray-400 font-bold uppercase">{d}</span>
                                        ))}
                                    </div>

                                    {/* Days Grid */}
                                    <div className="grid grid-cols-7 gap-1">
                                        {getDaysInMonth(currentMonth).map((day, idx) => {
                                            const isSelected = day && day.toISOString().split('T')[0] === selectedDate;
                                            const selectable = isDateSelectable(day);

                                            return (
                                                <div key={idx} className="aspect-square flex items-center justify-center">
                                                    {day && (
                                                        <button
                                                            disabled={!selectable}
                                                            onClick={() => {
                                                                const offsetDate = new Date(day.getTime() - (day.getTimezoneOffset() * 60000));
                                                                setSelectedDate(offsetDate.toISOString().split('T')[0]);
                                                            }}
                                                            className={`w-8 h-8 rounded-full text-xs font-medium flex items-center justify-center transition-all duration-200 relative
                                                                ${isSelected
                                                                    ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/30 scale-110'
                                                                    : selectable
                                                                        ? 'text-gray-700 dark:text-gray-300 hover:bg-brand-teal/10 hover:text-brand-teal'
                                                                        : 'text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-40'}
                                                            `}
                                                        >
                                                            <span className={!selectable ? 'line-through opacity-50' : ''}>
                                                                {day.getDate()}
                                                            </span>
                                                        </button>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Search Input */}
                            <div className="flex items-center gap-2">
                                <MapPin size={14} className="text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Where to?"
                                    className="bg-transparent border-none outline-none text-sm w-32 text-gray-700 dark:text-gray-200 placeholder-gray-400"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                />
                                <button
                                    onClick={handleSearch}
                                    className="bg-brand-blue hover:bg-brand-dark text-white p-1.5 rounded-full transition-colors"
                                    aria-label="Search"
                                >
                                    <Search size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Theme Toggle */}
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
                                <Link
                                    key={item}
                                    to={`/#${item.toLowerCase().replace(' ', '-')}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-lg font-bold tracking-widest uppercase text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-900 pb-4"
                                >
                                    {item}
                                </Link>
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
