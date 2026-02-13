import { useState } from 'react';
import { cruisePackages } from '../data/packages'; // Import data
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Anchor, ArrowRight } from 'lucide-react';

const Features = () => {
    // Duplicate packages to create seamless loop
    const marqueePackages = [...cruisePackages, ...cruisePackages];
    const [isPaused, setIsPaused] = useState(false);

    return (
        <section id="packages" className="py-24 bg-gray-50 dark:bg-black overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 md:px-12 mb-16 text-center">
                <span className="text-brand-teal dark:text-brand-yellow font-semibold tracking-wider uppercase text-sm mb-4 block">Exclusive Offers</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                    Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-blue">Cruise Packages</span>
                </h2>
                <p className="text-lg text-gray-500 dark:text-gray-200 max-w-2xl mx-auto">
                    Discover the Indian coastline like never before. Premium experiences, curated for you.
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
                            className="w-[300px] md:w-[400px] shrink-0 bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col hover:scale-[1.02] transition-transform duration-300"
                        >
                            {/* Image Half */}
                            <div className="h-64 relative overflow-hidden">
                                <img
                                    src={pkg.image}
                                    alt={pkg.title}
                                    className="w-full h-full object-cover"
                                />
                                <span className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur text-gray-900 dark:text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {pkg.duration}
                                </span>
                            </div>

                            {/* Content Half */}
                            <div className="p-6 flex flex-col justify-between flex-grow">
                                <div>
                                    <div className="flex items-center gap-2 mb-3 text-brand-blue text-xs font-bold uppercase tracking-wide">
                                        <Anchor className="w-3 h-3" />
                                        {pkg.ship}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-snug line-clamp-2">
                                        {pkg.title}
                                    </h3>

                                    <div className="space-y-2 text-gray-500 dark:text-gray-300 text-sm mb-6">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-brand-teal" />
                                            <span>{pkg.dateRange}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-brand-teal" />
                                            <span className="truncate">{pkg.route}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex items-center justify-between mt-auto">
                                    <div>
                                        <p className="text-sm font-bold text-brand-blue dark:text-brand-yellow">
                                            Contact for Best Price
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
        </section>
    );
};

export default Features;
