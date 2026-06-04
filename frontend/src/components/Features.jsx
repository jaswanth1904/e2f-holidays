import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Anchor, ArrowRight, Plane } from 'lucide-react';
import { optimizeImage } from '../utils/imageOptimizer';


const Features = () => {
    const [allPackages, setAllPackages] = useState([]);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/packages`);
                setAllPackages(data);
            } catch (error) {
                console.error("Error fetching packages:", error);
            }
        };
        fetchPackages();
    }, []);

    // Duplicate packages to create seamless loop
    const marqueePackages = allPackages.length > 0 ? [...allPackages, ...allPackages] : [];

    return (
        <section id="packages" className="py-24 bg-gray-50 dark:bg-black overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 md:px-12 mb-16 text-center">
                <span className="text-brand-teal dark:text-brand-yellow font-semibold tracking-wider uppercase text-sm mb-4 block">Exclusive Offers</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                    Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-blue">Holiday Packages</span>
                </h2>
                <p className="text-lg text-gray-500 dark:text-gray-200 max-w-2xl mx-auto">
                    From luxury cruises to exotic international getaways. Curated for you.
                </p>
            </div>

            {/* Infinite Marquee Container */}
            <div
                className="relative w-full"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Gradient Masks for smooth fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-gray-50 dark:from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-gray-50 dark:from-black to-transparent z-10 pointer-events-none" />

                <div
                    className="flex w-max animate-scroll space-x-8 px-8"
                    style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
                >
                    {marqueePackages.map((pkg, idx) => (
                        <div
                            key={`${pkg.id}-${idx}`}
                            className="w-[260px] md:w-[320px] shrink-0 bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col hover:scale-[1.02] transition-transform duration-300"
                        >
                            {/* Image Half */}
                            <div className="h-52 relative overflow-hidden">
                                <img
                                    src={optimizeImage(pkg.image, 600)}
                                    alt={pkg.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />
                                <span className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur text-gray-900 dark:text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                                    {pkg.duration}
                                </span>
                            </div>

                            {/* Content Half */}
                            <div className="p-5 flex flex-col justify-between flex-grow">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="inline-block px-2 py-0.5 rounded border border-brand-teal/20 bg-brand-teal/5 dark:bg-brand-teal/10 text-brand-teal dark:text-brand-yellow text-[10px] font-bold uppercase tracking-wider">
                                            {pkg.destination}
                                        </span>
                                        <div className="flex items-center gap-1.5 text-brand-blue text-[10px] font-bold uppercase tracking-wider">
                                            {pkg.ship?.includes("Empress") || pkg.ship?.includes("River") ? <Anchor className="w-3 h-3" /> : <Plane className="w-3 h-3" />}
                                            <span className="truncate max-w-[80px]">{pkg.ship}</span>
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-snug line-clamp-2">
                                        {pkg.title}
                                    </h3>

                                    <div className="space-y-1.5 text-gray-500 dark:text-gray-300 text-xs mb-4">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                                            <span className="truncate">{pkg.dateRange || "Customizable Dates"}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                                            <span className="truncate">{pkg.route}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex items-center justify-between mt-auto">
                                    <div>
                                        <p className="text-[10px] uppercase text-gray-400 font-bold mb-0.5">Starting From</p>
                                        <p className="text-sm font-bold text-brand-blue dark:text-brand-yellow">
                                            ₹{pkg.price ? pkg.price.toLocaleString('en-IN') : 'Call Us'}
                                        </p>
                                    </div>
                                    <Link
                                        to={`/package/${pkg.id}`}
                                        className="bg-brand-blue text-white px-5 py-2 rounded-full font-medium text-sm hover:bg-brand-dark transition-colors shadow-lg shadow-brand-blue/30 flex items-center gap-2"
                                    >
                                        Enquire <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Minimal Custom Request Section */}
            <div className="max-w-4xl mx-auto px-6 mt-16 text-center">
                <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-xl relative overflow-hidden group">
                    <div className="relative z-10">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Didn't find your <span className="text-brand-blue">dream destination</span>?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg mb-8 max-w-xl mx-auto font-medium leading-relaxed">
                            Don't worry! Call us or send an email about your favorite place. We will get in touch with you shortly to plan the perfect trip.
                        </p>
                        <div className="flex flex-wrap justify-center gap-5">
                            <a
                                href="https://wa.me/919642810644"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-8 py-3 rounded-full bg-[#25D366] text-white font-bold text-sm hover:bg-[#128C7E] transition-all shadow-lg shadow-[#25D366]/20"
                            >
                                💬 WhatsApp Us
                            </a>
                            <a
                                href="mailto:e2fhoildays@gmail.com"
                                className="flex items-center gap-3 px-8 py-3 rounded-full bg-brand-blue text-white font-bold text-sm hover:bg-brand-dark transition-all shadow-lg shadow-brand-blue/20"
                            >
                                📩 Send Email
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
