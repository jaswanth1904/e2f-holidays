import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Car, Utensils, Hotel, CheckCircle, ShieldCheck, HeartHandshake } from 'lucide-react';

const services = [
    {
        icon: <Car className="w-8 h-8 text-white" />,
        title: "Home-to-Home Pickup",
        description: "We start your journey right from your doorstep. Our premium cab service ensures a comfortable ride to your departure point.",
        color: "bg-brand-blue"
    },
    {
        icon: <Hotel className="w-8 h-8 text-white" />,
        title: "Premium Accommodation",
        description: "Stay in handpicked, top-rated hotels and resorts. We prioritize hygiene, comfort, and breathtaking views.",
        color: "bg-brand-red"
    },
    {
        icon: <Utensils className="w-8 h-8 text-white" />,
        title: "Curated Meals",
        description: "Savor the best local and international cuisines. Breakfast, lunch, and dinner are all part of the package.",
        color: "bg-brand-yellow"
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-white" />,
        title: "Safe & Secure",
        description: "Your safety is our priority. With 24/7 support and verified partners, you can explore with complete peace of mind.",
        color: "bg-brand-teal"
    },
    {
        icon: <HeartHandshake className="w-8 h-8 text-white" />,
        title: "Trusted Startup Care",
        description: "As a passionate startup, we value every traveler. We go the extra mile to ensure your trust is rewarded with an unforgettable experience.",
        color: "bg-brand-red"
    }
];

const Services = () => {
    return (
        <section id="services" className="py-24 bg-gray-50 dark:bg-black transition-colors duration-500 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">

                {/* Header */}
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-brand-teal dark:text-brand-yellow font-bold tracking-wider uppercase text-sm mb-4 block"
                    >
                        Why Choose Us
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6"
                    >
                        We Arrange <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-blue">Everything</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-500 dark:text-gray-300 max-w-2xl mx-auto"
                    >
                        Leave the planning to us. Just pack your bags and enjoy the journey from the moment you step out of your door.
                    </motion.p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group"
                        >
                            <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                {service.title}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}

                    {/* Final "Enjoy" Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="bg-gradient-to-br from-brand-teal to-brand-blue rounded-3xl p-8 shadow-xl text-white flex flex-col justify-center items-center text-center transform hover:scale-[1.02] transition-transform duration-300"
                    >
                        <HeartHandshake className="w-16 h-16 text-white mb-6 animate-pulse" />
                        <h3 className="text-2xl font-bold mb-4">Just Enjoy the Journey</h3>
                        <p className="text-white/90">
                            We take care of the rest. Trust us to make your holiday special.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-1/2 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-blue-50/50 dark:to-blue-900/10 -z-10 pointer-events-none" />
        </section>
    );
};

export default Services;
