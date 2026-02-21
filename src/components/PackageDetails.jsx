import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { cruisePackages, tourPackages } from '../data/packages';
import { southIndiaPackages } from '../data/southIndiaPackages';
import { MapPin, Calendar as CalendarIcon, Anchor, CheckCircle, XCircle, Info, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const PackageDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    let pkgRaw = cruisePackages.find(p => p.id === id) || tourPackages.find(p => p.id === id) || southIndiaPackages.find(p => p.id === id);

    // Calendar State
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const daysArray = [];
        for (let i = 0; i < firstDay; i++) daysArray.push(null);
        for (let i = 1; i <= daysInMonth; i++) daysArray.push(new Date(year, month, i));
        return daysArray;
    };

    const isDateSelectable = (date) => {
        if (!date) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
    };

    const changeMonth = (increment) => {
        const newDate = new Date(currentMonth);
        newDate.setMonth(newDate.getMonth() + increment);
        setCurrentMonth(newDate);
    };

    // Normalize data if it's a South India package (missing detailed fields)
    let pkg = pkgRaw;
    if (pkgRaw && !pkgRaw.itinerary) {
        pkg = {
            ...pkgRaw,
            dateRange: "Flexible Dates",
            ship: "Private Vehicle",
            route: pkgRaw.destinations?.join(" → "),
            itinerary: pkgRaw.destinations?.map((dest, i) => ({
                day: i + 1,
                port: dest,
                activity: `Explore the beautiful attractions and local culture of ${dest}. Overnight stay.`
            })) || [],
            inclusions: ["Premium Hotel Accommodation", "Daily Breakfast & Dinner", "AC Private Vehicle for Sightseeing", "All Tolls, Parking & Driver Bata"],
            shows: ["Traditional Cultural Performance", "Local Sightseeing Tours"],
            safetyOptions: ["Sanitized Cab", "Verified Drivers", "24/7 Support"],
            otherDetails: "Entry fees to monuments not included in standard package cost."
        };
    }

    if (!pkg) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-24 text-center">
                <div>
                    <h2 className="text-3xl font-bold mb-4">Package Not Found</h2>
                    <Link to="/" className="text-brand-teal hover:underline">Return to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24 min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white pb-20">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <button
                    onClick={() => {
                        const isSouthIndia = southIndiaPackages.some(p => p.id === id);
                        navigate(isSouthIndia ? '/#south-india' : '/#packages');
                    }}
                    className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-blue dark:text-gray-400 dark:hover:text-white mb-4 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
                </button>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 dark:border-gray-800 pb-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-brand-blue mb-2">
                            {pkg.title}
                        </h1>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1"><Anchor className="w-4 h-4" /> {pkg.ship}</span>
                            <span className="flex items-center gap-1"><CalendarIcon className="w-4 h-4" /> {pkg.dateRange || "Flexible Dates"}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {pkg.route}</span>
                        </div>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                        <p className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">Interested in this experience?</p>
                        <a
                            href={`mailto:hello@e2fholidays.com?subject=${encodeURIComponent(`Enquiry for ${pkg.title}`)}&body=${encodeURIComponent(`Hi,\n\nI am interested in the ${pkg.title} package.\n\nPlease share the best price and availability.\n\nThanks`)}`}
                            className="inline-block mt-2 bg-gradient-to-r from-brand-red to-brand-yellow hover:from-brand-red/90 hover:to-brand-yellow/90 text-white px-8 py-3 rounded-md font-semibold transition-all shadow-lg hover:shadow-xl"
                        >
                            Email Us for Quote
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Itinerary */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl overflow-hidden shadow-2xl h-64 md:h-96 w-full relative"
                    >
                        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                            <h3 className="text-white text-xl font-bold">{pkg.duration} Journey</h3>
                        </div>
                    </motion.div>

                    {/* Itinerary Timeline */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <CalendarIcon className="w-5 h-5 text-brand-blue" /> Day Wise Itinerary
                        </h2>
                        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                            {pkg.itinerary.map((item, index) => (
                                <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-brand-blue text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                        <span className="font-bold">{item.day}</span>
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
                                        <div className="flex items-center justify-between space-x-2 mb-1">
                                            <div className="font-bold text-slate-900 dark:text-white">{item.port}</div>
                                        </div>
                                        <div className="text-slate-500 dark:text-gray-400 text-sm">
                                            {item.activity}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Other Details */}
                    {pkg.otherDetails && (
                        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                Important Information
                            </h2>
                            <div className="prose dark:prose-invert max-w-none text-sm text-gray-600 dark:text-gray-300">
                                <p className="whitespace-pre-line">{pkg.otherDetails}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: Inclusions & Shows & Trust */}
                <div className="space-y-6">
                    {/* Travel Dates Selection */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <CalendarIcon className="w-5 h-5 text-brand-blue" /> Select Travel Date
                        </h3>

                        {/* Compact Calendar */}
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 border border-gray-100 dark:border-gray-800/50">
                            <div className="flex justify-between items-center mb-4">
                                <button onClick={() => changeMonth(-1)} className="p-1.5 hover:bg-white dark:hover:bg-gray-700 rounded-full transition-colors">
                                    <ChevronLeft size={16} />
                                </button>
                                <span className="font-bold text-sm">
                                    {currentMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                </span>
                                <button onClick={() => changeMonth(1)} className="p-1.5 hover:bg-white dark:hover:bg-gray-700 rounded-full transition-colors">
                                    <ChevronRight size={16} />
                                </button>
                            </div>

                            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                                    <span key={d} className="text-[10px] text-gray-400 font-bold uppercase">{d}</span>
                                ))}
                            </div>

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
                                                    className={`w-7 h-7 rounded-full text-[10px] font-bold flex items-center justify-center transition-all duration-200 relative
                                                        ${isSelected
                                                            ? 'bg-brand-blue text-white shadow-md'
                                                            : selectable
                                                                ? 'text-gray-700 dark:text-gray-300 hover:bg-brand-blue/10 hover:text-brand-blue'
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

                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Date:</span>
                            <span className="text-xs font-bold text-brand-blue">
                                {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </span>
                        </div>
                    </div>

                    {/* Seamless Journey Trust Builder */}
                    <div className="bg-gradient-to-br from-brand-blue/5 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 shadow-sm border border-brand-blue/10 dark:border-gray-700">
                        <h3 className="text-lg font-bold mb-4 text-brand-blue flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" /> End-to-End Service
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                            We handle everything from your doorstep to the destination.
                        </p>
                        <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 relative">
                            {/* Connector Line */}
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -z-10 transform -translate-y-1/2"></div>

                            <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-2 rounded-full z-10">
                                <MapPin className="w-5 h-5 text-brand-teal mb-1" />
                                <span className="text-[10px] font-bold uppercase">Home</span>
                            </div>
                            <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-2 rounded-full z-10">
                                <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                                    <div className="w-5 h-5 text-brand-blue">🚙</div> {/* Car Emoji as icon substitute or use Car from lucide if imported */}
                                </motion.div>
                                <span className="text-[10px] font-bold uppercase">Cab</span>
                            </div>
                            <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-2 rounded-full z-10">
                                <Anchor className="w-5 h-5 text-brand-red mb-1" />
                                <span className="text-[10px] font-bold uppercase">Cruise</span>
                            </div>
                        </div>
                    </div>

                    {/* Trust & Contact Box (Namaste) */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 relative group">
                        <div className="h-48 overflow-hidden relative">
                            <img
                                src="https://www.amle.org/wp-content/uploads/2021/02/784784p888EDNmain1084iStock-962787224.jpg"
                                alt="Namaste - Welcome"
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                                <h3 className="text-white font-bold text-xl italic font-script">"Namaskaram"</h3>
                            </div>
                        </div>
                        <div className="p-6 text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                Our experts are here to help you plan the perfect getaway. We are just a call away.
                            </p>
                            <div className="space-y-3">
                                <div className="block w-full py-3 rounded-lg bg-brand-teal text-white font-bold flex items-center justify-center gap-2 cursor-default">
                                    📞 Call +91 98765 43210
                                </div>
                                <div className="block w-full py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white font-medium cursor-default">
                                    📩 hello@e2fholidays.com
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inclusions Card - Sticky */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 sticky top-24">
                        <h3 className="text-lg font-bold mb-4">Inclusions</h3>
                        <ul className="space-y-3">
                            {pkg.inclusions.map((inc, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                                    <CheckCircle className="w-5 h-5 text-brand-teal shrink-0" />
                                    <span>{inc}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8">
                            <h3 className="text-lg font-bold mb-4">Entertainment Shows</h3>
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
                                {pkg.shows.map((show, i) => (
                                    <div key={i} className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
                                        <span className="text-sm font-medium">{show}</span>
                                        <CheckCircle className="w-4 h-4 text-brand-teal" />
                                    </div>
                                ))}
                                <div className="flex justify-between items-center p-3 text-gray-400">
                                    <span className="text-sm">Personal Laundry</span>
                                    <XCircle className="w-4 h-4 text-brand-red" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                            <Link to="/contact" className="block w-full text-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-lg font-medium transition-colors">
                                Request a Call
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PackageDetails;
