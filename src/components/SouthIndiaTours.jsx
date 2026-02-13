import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { southIndiaPackages } from '../data/southIndiaPackages';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SouthIndiaTours = () => {
    return (
        <section className="py-24 bg-white dark:bg-black transition-colors duration-500 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-12">

                {/* Header with Animation */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
                >
                    <div className="max-w-2xl">
                        <span className="text-brand-yellow dark:text-brand-yellow font-semibold tracking-wider uppercase text-sm mb-4 block">
                            Explore the South
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
                            Enchanting <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-red">
                                South India Tours
                            </span>
                        </h2>
                    </div>
                </motion.div>

                {/* Staggered Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {southIndiaPackages.map((pkg, idx) => (
                        <motion.div
                            key={pkg.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative bg-gray-50 dark:bg-gray-900 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-brand-yellow/10 transition-all duration-500"
                        >
                            {/* Image Container with Zoom Effect */}
                            <div className="h-64 overflow-hidden relative">
                                <motion.img
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                    src={pkg.image}
                                    alt={pkg.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                <span className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold border border-white/30">
                                    {pkg.duration}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-6 relative">
                                {/* Floating Price Tag */}
                                <div className="absolute -top-10 right-6 bg-brand-yellow text-white w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-lg transform group-hover:-translate-y-2 transition-transform duration-300 border-4 border-white dark:border-gray-900">
                                    <span className="text-xs font-bold uppercase text-center leading-tight">Best<br />Deal</span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-brand-yellow transition-colors">
                                    {pkg.title}
                                </h3>

                                <p className="text-gray-500 dark:text-gray-200 text-sm mb-6 line-clamp-2">
                                    {pkg.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {pkg.destinations.slice(0, 3).map((dest, i) => (
                                        <span key={i} className="text-xs font-medium text-gray-600 dark:text-white bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-md">
                                            {dest}
                                        </span>
                                    ))}
                                    {pkg.destinations.length > 3 && (
                                        <span className="text-xs font-medium text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">+{pkg.destinations.length - 3}</span>
                                    )}
                                </div>

                                <Link to={`/package/${pkg.id}`} className="w-full py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-semibold hover:bg-brand-yellow hover:text-white hover:border-brand-yellow transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                                    Explore Plan <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SouthIndiaTours;
