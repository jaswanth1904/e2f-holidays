import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Mail, Download } from 'lucide-react';

const FreeGuide = () => {
    return (
        <section id="free-guide" className="py-24 px-6 md:px-12 bg-gray-50 dark:bg-zinc-900 transition-colors duration-500 overflow-hidden relative">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=60&w=1200&auto=format&fit=crop"
                    alt="Travel Guide Background"
                    loading="lazy"
                    className="w-full h-full object-cover opacity-20 dark:opacity-10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent dark:from-zinc-900 dark:via-zinc-900/80 dark:to-transparent"></div>
            </div>

            <div className="max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-20">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex-1 text-center md:text-left"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-brand-teal/10 dark:bg-brand-teal/30 text-brand-teal dark:text-brand-yellow text-xs font-bold tracking-widest uppercase mb-6">
                        Limited Time Offer
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 font-display leading-tight">
                        Unlock the Secrets of <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-blue">Luxury Travel</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        Download our exclusive 2024 Travel Guide. Inside, you'll find curated itineraries for Bali, Switzerland, and Dubai, plus expert tips on how to travel like a VIP for less.
                    </p>

                    <ul className="space-y-4 mb-8 text-left max-w-md mx-auto md:mx-0">
                        {['Top 10 Hidden Gems in Europe', 'Visa Hacks for Indian Travelers', 'Packing List for Every Season'].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                <span className="w-6 h-6 rounded-full bg-brand-teal/10 dark:bg-brand-teal/30 text-brand-teal flex items-center justify-center text-xs">✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Right Form/Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex-1 w-full max-w-md bg-white dark:bg-black p-8 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-white/10 relative"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-brand-blue rounded-full flex items-center justify-center shadow-lg shadow-brand-blue/30 ring-4 ring-white dark:ring-zinc-900">
                        <Download size={32} className="text-white animate-bounce" />
                    </div>

                    <div className="mt-8 text-center">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-display">Get Your Free Copy</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Join 10,000+ travelers exploring the world.</p>

                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-brand-blue outline-none transition-all placeholder:text-gray-400 text-gray-900 dark:text-white"
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-brand-blue outline-none transition-all placeholder:text-gray-400 text-gray-900 dark:text-white"
                            />
                            <button className="w-full py-4 bg-gradient-to-r from-brand-teal to-brand-blue hover:from-brand-teal/90 hover:to-brand-blue/90 text-white font-bold rounded-xl shadow-lg transform transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2">
                                Send Me the Guide <ArrowDown size={18} />
                            </button>
                        </form>
                        <p className="text-xs text-center text-gray-400 mt-4">No spam, ever. Unsubscribe anytime.</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FreeGuide;
