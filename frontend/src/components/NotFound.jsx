import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Compass } from 'lucide-react';

const NotFound = () => {
    return (
        <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden bg-white dark:bg-black transition-colors duration-500">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none opacity-10 dark:opacity-20">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-blue rounded-full blur-[100px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-teal rounded-full blur-[100px]"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
            >
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <Compass size={100} className="text-brand-blue animate-spin-slow opacity-80" />
                        <MapPin size={40} className="text-brand-red absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                </div>

                <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 dark:from-zinc-800 dark:to-zinc-700 opacity-50 select-none mb-4">
                    404
                </h1>

                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Lost in Navigation?
                </h2>

                <p className="text-lg text-gray-500 dark:text-gray-400 max-w-lg mx-auto mb-10">
                    It seems you've ventured into uncharted territory. The destination you are looking for doesn't exist on our map.
                </p>

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-dark text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                    Return to Home Base
                </Link>
            </motion.div>
        </section>
    );
};

export default NotFound;
