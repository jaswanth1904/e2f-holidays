import { motion } from 'framer-motion';

const DestinationCard = ({ id, name, image, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: delay }}
            whileHover={{ y: -10 }}
            className="group relative h-[500px] w-full rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-all"
        >
            <img src={image} alt={name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-8 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-bold text-white mb-1 leading-tight">{name}</h3>
                </div>
            </div>
        </motion.div>
    );
};

const Destinations = () => {
    const destinations = [
        { id: 1, name: "Ladakh, India", image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1000&auto=format&fit=crop" },
        { id: 2, name: "Jaipur, Rajasthan", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1000&auto=format&fit=crop" },
        { id: 3, name: "Manali, Himachal", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1000&auto=format&fit=crop" },
    ];

    return (
        <section id="destinations" className="py-24 px-6 md:px-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-4">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-900 dark:text-white mb-4">All Time Fav Destinations</h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md">Handpicked Indian destinations that blend culture, adventure, and relaxation.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {destinations.map((dest, idx) => (
                        <DestinationCard key={dest.id} {...dest} delay={idx * 0.2} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Destinations;
