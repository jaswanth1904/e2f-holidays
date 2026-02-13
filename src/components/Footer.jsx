import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-500 py-24 px-6 md:px-12 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="md:col-span-1">
                    <h2 className="text-3xl font-black tracking-tighter mb-6">E2F <span className="text-brand-teal">HOLIDAYS</span></h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                        Redefining travel for the modern explorer. From bespoke itineraries to seamless logistics.
                    </p>
                </div>

                {['Company', 'Support', 'Legal'].map((title, idx) => (
                    <div key={idx} className="md:col-span-1">
                        <h3 className="font-bold text-lg mb-6">{title}</h3>
                        <ul className="space-y-4 text-gray-500 dark:text-gray-400 text-sm">
                            <li className="hover:text-brand-yellow transition-colors cursor-pointer">About Us</li>
                            <li className="hover:text-brand-yellow transition-colors cursor-pointer">Careers</li>
                            <li className="hover:text-brand-yellow transition-colors cursor-pointer">Contact</li>
                            <li className="hover:text-brand-yellow transition-colors cursor-pointer">Blog</li>
                        </ul>
                    </div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 dark:text-gray-600">
                <p>&copy; {new Date().getFullYear()} E2F Holidays. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Instagram</a>
                    <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
