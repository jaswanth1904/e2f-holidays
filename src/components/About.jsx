import { motion } from 'framer-motion';
import { Check, ShieldCheck, Star, Users, Map, Clock } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

const About = () => {
    return (
        <section id="about" className="py-24 bg-white dark:bg-black transition-colors duration-500 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col md:flex-row items-center gap-12 md:gap-24 mb-24">

                {/* 1. Image Half */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 relative"
                >
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                        <img
                            src="https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=800&q=80"
                            alt="Our Team Spirit"
                            loading="lazy"
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                            <div className="text-white">
                                <p className="text-sm font-bold uppercase tracking-wider mb-2 text-brand-teal">Our Mission</p>
                                <h3 className="text-2xl font-bold leading-tight">"To make travel effortless, accessible, and unforgettable for everyone."</h3>
                            </div>
                        </div>
                    </div>
                    {/* Floating Badge */}
                    <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 animate-bounce-slow z-10">
                        <div className="flex items-center gap-3">
                            <div className="bg-brand-teal/20 dark:bg-brand-teal/30 p-2 rounded-full">
                                <ShieldCheck className="w-6 h-6 text-brand-teal" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">Trusted By</p>
                                <p className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                                    <AnimatedCounter value={500} suffix="+" /> Travelers
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 2. Content Half */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full md:w-1/2"
                >
                    <span className="text-brand-teal dark:text-brand-yellow font-bold tracking-wider uppercase text-sm mb-4 block">
                        About E2F Holidays
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
                        We are a <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-blue">
                            Startup with a Heart.
                        </span>
                    </h2>
                    <p className="text-lg text-gray-500 dark:text-gray-300 mb-6 leading-relaxed">
                        Embarking on a journey is more than just moving from place to place—it's about the memories you create along the way. At E2F Holidays, we are a passionate team of travel enthusiasts dedicated to crafting seamless experiences.
                    </p>
                    <p className="text-lg text-gray-500 dark:text-gray-300 mb-8 leading-relaxed">
                        As a growing startup, every traveler is family to us. We take pride in handling every detail—from the moment you leave your doorstep to the moment you return. Your trust fuels our passion to serve you better.
                    </p>

                    <ul className="space-y-4 mb-8">
                        {[
                            "Personalized Itineraries tailored to your interests.",
                            "24/7 Support throughout your journey.",
                            "Honest Pricing with no hidden costs.",
                            "Dedicated to your safety and comfort."
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-200 font-medium">
                                <div className="bg-brand-teal/10 dark:bg-brand-teal/30 p-1 rounded-full text-brand-teal">
                                    <Check className="w-4 h-4" />
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* 3. New Stats Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { icon: Users, value: 1000, suffix: "+", label: "Happy Travelers" },
                        { icon: Map, value: 50, suffix: "+", label: "Destinations" },
                        { icon: Clock, value: 24, suffix: "/7", label: "Support" },
                        { icon: Star, value: 4.9, suffix: "", label: "Average Rating" }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl text-center border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all"
                        >
                            <div className="flex justify-center mb-4">
                                <div className="bg-brand-blue/10 dark:bg-brand-blue/30 p-4 rounded-full text-brand-blue">
                                    <stat.icon className="w-8 h-8" />
                                </div>
                            </div>
                            <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-2 font-display">
                                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider text-xs">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
