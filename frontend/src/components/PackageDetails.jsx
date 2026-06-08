import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Calendar as CalendarIcon, Anchor, CheckCircle, XCircle, Info, ArrowLeft, ChevronDown, ChevronUp, Hotel, Car, Utensils, Camera, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from './SEO';

const PackageDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pkgData, setPkgData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openDay, setOpenDay] = useState(1);

    useEffect(() => {
        const loadPackage = async () => {
            setLoading(true);
            try {
                // Dynamically import data files
                const [{ cruisePackages, tourPackages }, { southIndiaPackages }] = await Promise.all([
                    import('../data/packages'),
                    import('../data/southIndiaPackages')
                ]);

                const found = cruisePackages.find(p => p.id === id) ||
                    tourPackages.find(p => p.id === id) ||
                    southIndiaPackages.find(p => p.id === id);

                if (found) {
                    setPkgData(found);
                } else {
                    const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/packages`);
                    const allData = await res.json();
                    const apiFound = allData.find(p => p.id === id || p._id === id);
                    if (apiFound) setPkgData(apiFound);
                }
            } catch (err) {
                console.error("Failed to load package:", err);
            } finally {
                setLoading(false);
            }
        };
        loadPackage();
    }, [id]);

    if (loading) {
        return (
            <div className="pt-32 pb-24 flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!pkgData) {
        return (
            <div className="pt-32 pb-24 text-center min-h-screen">
                <h1 className="text-2xl font-bold">Package Not Found</h1>
                <Link to="/" className="text-brand-blue hover:underline mt-4 inline-block">Return Home</Link>
            </div>
        );
    }

    // Normalize data to ensure all fields exist
    const pkg = {
        ...pkgData,
        dateRange: pkgData?.dateRange || "Flexible Dates",
        ship: pkgData?.ship || "Private Vehicle",
        route: pkgData?.route || pkgData?.destinations?.join(" → "),
        itinerary: pkgData?.itinerary || pkgData?.destinations?.map((dest, i) => ({
            day: i + 1,
            port: dest,
            activity: `Explore the beautiful attractions and local culture of ${dest}. Overnight stay.`
        })) || [],
        inclusions: pkgData?.inclusions || ["Premium Hotel Accommodation", "Daily Breakfast & Dinner", "AC Private Vehicle for Sightseeing", "All Tolls, Parking & Driver Bata"],
        shows: pkgData?.shows || ["Traditional Cultural Performance", "Local Sightseeing Tours"],
        safetyOptions: pkgData?.safetyOptions || ["Sanitized Cab", "Verified Drivers", "24/7 Support"],
        otherDetails: pkgData?.otherDetails || "Entry fees to monuments not included in standard package cost."
    };

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
        <>
            <SEO 
                title={`${pkg.title} - E2F Holidays`}
                description={pkg.description}
                type="article"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "TouristTrip",
                    "name": pkg.title,
                    "description": pkg.description,
                    "provider": {
                        "@type": "TravelAgency",
                        "name": "E2F Holidays"
                    },
                    "offers": {
                        "@type": "Offer",
                        "price": pkg.price || 0,
                        "priceCurrency": "INR"
                    }
                }}
            />
            <div className="min-h-screen bg-[#F5F7FA] dark:bg-black text-gray-900 dark:text-white pb-20 font-sans pt-16 md:pt-20">
                {/* Hero Section */}
            <div className="relative h-[300px] md:h-[450px] w-full">
                <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 flex flex-col justify-end pb-8 md:pb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        {/* Back button removed as requested */}
                        <div className="flex flex-wrap items-center gap-3 mb-3 pt-8">
                            <span className="bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">{pkg.duration}</span>
                            <span className="bg-brand-teal text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">{pkg.destination}</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-3 drop-shadow-lg">
                            {pkg.title}
                        </h1>
                        <p className="text-base md:text-lg text-gray-200 max-w-3xl line-clamp-2 md:line-clamp-none drop-shadow-sm">{pkg.description}</p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Column (Content) */}
                <div className="lg:col-span-8 space-y-6 md:space-y-8">
                    {/* Key Info Banner */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 dark:divide-gray-700">
                            {/* Departure */}
                            <div className="flex flex-col sm:items-center sm:text-center pt-2 sm:pt-0">
                                <div className="bg-blue-50 dark:bg-blue-900/30 w-12 h-12 flex items-center justify-center rounded-full text-brand-blue dark:text-blue-400 mb-3 sm:mx-auto">
                                    <CalendarIcon size={24} />
                                </div>
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Departure</p>
                                <p className="font-bold text-gray-900 dark:text-white">{pkg.dateRange || "Flexible Dates"}</p>
                            </div>

                            {/* Route */}
                            <div className="flex flex-col sm:items-center sm:text-center pt-6 sm:pt-0">
                                <div className="bg-teal-50 dark:bg-teal-900/30 w-12 h-12 flex items-center justify-center rounded-full text-brand-teal dark:text-teal-400 mb-3 sm:mx-auto">
                                    <MapPin size={24} />
                                </div>
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Route</p>
                                <p className="font-bold text-gray-900 dark:text-white leading-tight">
                                    {pkg.route}
                                </p>
                            </div>

                            {/* Transport */}
                            <div className="flex flex-col sm:items-center sm:text-center pt-6 sm:pt-0">
                                <div className="bg-orange-50 dark:bg-orange-900/30 w-12 h-12 flex items-center justify-center rounded-full text-brand-yellow dark:text-yellow-500 mb-3 sm:mx-auto">
                                    <Anchor size={24} />
                                </div>
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Transport</p>
                                <p className="font-bold text-gray-900 dark:text-white leading-tight">
                                    {pkg.ship}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* We Take Care Of You Section */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                            <CheckCircle className="w-8 h-8 text-green-500" />
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-wide">We Take Care of You!</h3>
                        </div>
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-medium">
                            From the moment you book until you return home with unforgettable memories, our dedicated team handles every detail. Your comfort and safety are our top priorities.
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="flex flex-col items-center text-center p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl hover:scale-105 transition-transform">
                                <Hotel className="w-10 h-10 text-brand-blue mb-3" />
                                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Premium Stays</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Handpicked 4 & 5-star accommodations.</p>
                            </div>
                            <div className="flex flex-col items-center text-center p-4 bg-teal-50 dark:bg-teal-900/10 rounded-xl hover:scale-105 transition-transform">
                                <Car className="w-10 h-10 text-brand-teal mb-3" />
                                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Seamless Transfers</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">AC Vehicles & experienced drivers.</p>
                            </div>
                            <div className="flex flex-col items-center text-center p-4 bg-orange-50 dark:bg-orange-900/10 rounded-xl hover:scale-105 transition-transform">
                                <Camera className="w-10 h-10 text-brand-yellow mb-3" />
                                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Guided Sightseeing</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Expert guides & scenic routes covered.</p>
                            </div>
                            <div className="flex flex-col items-center text-center p-4 bg-green-50 dark:bg-green-900/10 rounded-xl hover:scale-105 transition-transform">
                                <Utensils className="w-10 h-10 text-green-500 mb-3" />
                                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Delicious Meals</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Daily breakfast & dinner included.</p>
                            </div>
                        </div>
                    </div>

                    {/* Itinerary */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
                        <h2 className="text-2xl font-black mb-2 text-gray-900 dark:text-white flex items-center gap-3">
                            <CalendarIcon className="w-6 h-6 text-brand-blue" /> Day Wise Itinerary in Detail
                        </h2>
                        <p className="text-sm text-gray-500 mb-8 border-b border-gray-100 dark:border-gray-800 pb-4">
                            Explore your detailed day-by-day plan with scenic highlights.
                        </p>
                        <div className="space-y-4">
                            {pkg.itinerary.map((item, index) => {
                                const isOpen = openDay === item.day;
                                return (
                                    <div key={index} className={`border rounded-xl transition-all duration-300 ${isOpen ? 'border-brand-blue shadow-md' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'}`}>
                                        <button 
                                            onClick={() => setOpenDay(isOpen ? null : item.day)}
                                            className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex flex-col items-center justify-center font-black transition-colors ${isOpen ? 'bg-brand-blue text-white' : 'bg-blue-50 dark:bg-gray-800 text-brand-blue dark:text-gray-300'}`}>
                                                    <span className="text-[9px] uppercase leading-none mt-1">Day</span>
                                                    <span className="leading-none">{item.day}</span>
                                                </div>
                                                <h4 className={`text-lg font-bold ${isOpen ? 'text-brand-blue' : 'text-gray-900 dark:text-white'}`}>
                                                    {item.port}
                                                </h4>
                                            </div>
                                            <div className="text-gray-400 shrink-0">
                                                {isOpen ? <ChevronUp className="w-6 h-6 text-brand-blue" /> : <ChevronDown className="w-6 h-6" />}
                                            </div>
                                        </button>
                                        
                                        {/* Accordion Content */}
                                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="p-4 sm:p-5 pt-0 sm:pl-16 relative">
                                                <div className="hidden sm:block absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 -z-10"></div>
                                                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm relative transform origin-top transition-transform duration-500">
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                        <div className="md:col-span-2 space-y-4">
                                                            <div className="flex flex-col gap-1 mb-2">
                                                                <h5 className="font-black text-xl text-gray-900 dark:text-white">{item.port}</h5>
                                                                <p className="text-xs text-brand-blue dark:text-blue-400 font-bold tracking-wide uppercase">Featured Destination</p>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-brand-blue dark:text-blue-400 mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                                                                <MapPin size={18} />
                                                                <h6 className="font-bold uppercase tracking-wider text-xs">Location Details</h6>
                                                            </div>
                                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium text-sm md:text-base">
                                                                {item.activity}
                                                            </p>
                                                        </div>
                                                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/50 flex flex-col justify-center h-fit space-y-3">
                                                            <div className="flex items-center gap-2 text-brand-teal">
                                                                <Clock size={16} />
                                                                <span className="font-bold text-xs uppercase tracking-wider">Best Time</span>
                                                            </div>
                                                            <p className="font-bold text-gray-900 dark:text-white text-sm">
                                                                Early Morning to Evening
                                                            </p>
                                                            <div className="w-full h-px bg-blue-200 dark:bg-blue-800"></div>
                                                            <div className="flex items-center gap-2 text-brand-yellow">
                                                                <Info size={16} />
                                                                <span className="font-bold text-xs uppercase tracking-wider">Highlight</span>
                                                            </div>
                                                            <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm">
                                                                Scenic views & photography
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Inclusions & Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800 h-full">
                            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500" /> What's Included
                            </h3>
                            <ul className="space-y-4">
                                {pkg.inclusions.map((inc, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium">
                                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <span>{inc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800 h-full">
                            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                                <Info className="w-5 h-5 text-brand-teal" /> Experiences / Notes
                            </h3>
                            <ul className="space-y-4">
                                {pkg.shows.map((show, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium">
                                        <CheckCircle className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                                        <span>{show}</span>
                                    </li>
                                ))}
                            </ul>
                            {pkg.otherDetails && (
                                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                        {pkg.otherDetails}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column (Sticky Pricing & Contact) */}
                <div className="lg:col-span-4 mt-8 lg:mt-0">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 sticky top-28 overflow-hidden">
                        {/* Price Header Removed, Replaced with Contact Prompt */}
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white text-center relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                            <p className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-2">Want the Best Fare?</p>
                            <h2 className="text-3xl md:text-4xl font-black text-brand-yellow drop-shadow-md">
                                Contact Us for a Custom Quote
                            </h2>
                            <p className="text-xs text-gray-400 mt-3 font-medium tracking-wide">Call or WhatsApp below!</p>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="p-6 space-y-4">
                            <a
                                href={`tel:+919642810644`}
                                className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl bg-brand-blue text-white font-bold text-base hover:bg-brand-dark transition-all shadow-lg shadow-brand-blue/30 group"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                Call: +91 96428 10644
                            </a>

                            <a
                                href={`mailto:info.e2fhoildays@gmail.com?subject=Enquiry for ${pkg.title}&body=Hi, I would like to get more details and a quote for the ${pkg.title} package.`}
                                className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl border-2 border-brand-blue text-brand-blue dark:text-blue-400 font-bold text-base hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-1 transition-transform"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                Email Enquiry
                            </a>

                            <a
                                href={`https://wa.me/919642810644?text=${encodeURIComponent(`Hi, I'm interested in the ${pkg.title} package. Please share details.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-base hover:bg-[#128C7E] transition-all shadow-lg shadow-green-500/20 group"
                            >
                                <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M12.031 6.172c-2.31 0-4.191 1.881-4.191 4.192 0 .61.131 1.189.365 1.714l-.45 1.642 1.685-.442c.504.209 1.057.324 1.591.324 2.31 0 4.191-1.881 4.191-4.192s-1.881-4.192-4.191-4.192zm3.322 5.923c-.15.209-.851.815-1.168.815-.316 0-.622-.053-1.096-.242-.473-.188-1.042-.416-1.503-.844-.462-.428-.737-.806-.931-1.127-.193-.321-.193-.54-.15-.75.043-.209.15-.321.225-.428.075-.107.13-.188.13-.188s.023-.043.037-.064c.014-.022.023-.053.023-.085 0-.032-.014-.064-.037-.085-.022-.022-.13-.321-.183-.448-.052-.128-.106-.246-.15-.321-.044-.075-.084-.107-.13-.107-.045 0-.083.011-.132.043-.047.032-.214.209-.214.509 0 .299.219.589.247.632.028.043.432.664 1.046 1.127.615.463 1.139.632 1.536.685.397.054.76.043 1.046.011.286-.032.873-.357 1.002-.697.129-.339.129-.631.09-.696-.038-.065-.13-.107-.272-.177zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.019 18.298c-1.171 0-2.31-.299-3.322-.862l-3.322.873.884-3.238c-.622-1.066-.95-2.285-.95-3.53s.328-2.464.95-3.53l-.884-3.238 3.322.873c1.012-.563 2.151-.862 3.322-.862 3.737 0 6.777 3.04 6.777 6.777s-3.04 6.777-6.777 6.777z" /></svg>
                                WhatsApp Now
                            </a>
                        </div>
                        
                        {/* Note & Policy */}
                        <div className="bg-gray-50 dark:bg-gray-800 p-5 border-t border-gray-100 dark:border-gray-700 space-y-3">
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-start gap-2 font-medium">
                                <Info size={16} className="text-brand-blue shrink-0 mt-0.5" /> 
                                <span>No upfront money required to plan your trip! We only charge upon final confirmation.</span>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-start gap-2 font-medium">
                                <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" /> 
                                <span>Note: Standard no-refund policy applies once the booking is finalized and confirmed.</span>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
            </div>
        </>
    );
};

export default PackageDetails;
