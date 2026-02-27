import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-24 px-6 md:px-12 bg-gray-50 dark:bg-zinc-900 transition-colors duration-500">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

                {/* Info Column */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex flex-col justify-center"
                >
                    <span className="text-brand-teal dark:text-brand-yellow font-bold tracking-widest uppercase text-xs mb-4">Get In Touch</span>
                    <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 font-display">
                        Start Your <br className="hidden md:block" /> <span className="font-script font-normal text-6xl md:text-7xl">Journey</span>
                    </h2>
                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md mb-12">
                        Have questions or ready to book? Reach out to our travel specialists for a personalized consultation.
                    </p>

                    <div className="space-y-8">
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-full bg-brand-blue/10 dark:bg-brand-blue/30 flex items-center justify-center shrink-0">
                                <MapPin size={24} className="text-brand-blue dark:text-brand-blue" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-display">Visit Us</h4>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
                                    Mindspace IT Park, Building 12A,<br />
                                    Madhapur, Hyderabad,<br />
                                    Telangana, 500081 India
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-full bg-brand-red/10 dark:bg-brand-red/30 flex items-center justify-center shrink-0">
                                <Mail size={24} className="text-brand-red dark:text-brand-red" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-display">Email Us</h4>
                                <a href="mailto:e2fhoildays@gmail.com" className="text-gray-500 dark:text-gray-400 max-w-xs block hover:text-brand-yellow transition-colors">
                                    e2fhoildays@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-full bg-brand-teal/10 dark:bg-brand-teal/30 flex items-center justify-center shrink-0">
                                <Phone size={24} className="text-brand-teal dark:text-brand-teal" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-display">Call Us</h4>
                                <a href="https://wa.me/919642810644" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 max-w-xs block hover:text-[#25D366] transition-colors font-bold">
                                    +91 96428 10644 (WhatsApp)
                                </a>
                                <p className="text-gray-400 text-sm mt-1">Mon-Sat, 9am - 7pm IST</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Form Column */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-black p-8 md:p-12 rounded-[2rem] shadow-xl border border-gray-100 dark:border-white/10 relative overflow-hidden"
                >
                    {/* Subtle decorative circle */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <form className="relative z-10 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">First Name</label>
                                <input type="text" placeholder="John" className="w-full bg-gray-50 dark:bg-zinc-900 border border-transparent focus:border-brand-blue focus:bg-white dark:focus:bg-black rounded-xl px-4 py-3 outline-none transition-all placeholder:text-gray-400 text-gray-900 dark:text-white" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Last Name</label>
                                <input type="text" placeholder="Doe" className="w-full bg-gray-50 dark:bg-zinc-900 border border-transparent focus:border-brand-blue focus:bg-white dark:focus:bg-black rounded-xl px-4 py-3 outline-none transition-all placeholder:text-gray-400 text-gray-900 dark:text-white" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Email Address</label>
                            <input
                                type="email"
                                value="e2fhoildays@gmail.com"
                                readOnly
                                className="w-full bg-gray-200 dark:bg-zinc-800 border border-transparent rounded-xl px-4 py-3 outline-none transition-all text-gray-600 dark:text-gray-400 cursor-not-allowed select-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Destination Interest</label>
                            <input type="text" placeholder="Name your dream destination" className="w-full bg-gray-50 dark:bg-zinc-900 border border-transparent focus:border-brand-blue focus:bg-white dark:focus:bg-black rounded-xl px-4 py-3 outline-none transition-all placeholder:text-gray-400 text-gray-900 dark:text-white" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Message</label>
                            <textarea rows="4" placeholder="Tell us about your dream trip..." className="w-full bg-gray-50 dark:bg-zinc-900 border border-transparent focus:border-brand-blue focus:bg-white dark:focus:bg-black rounded-xl px-4 py-3 outline-none transition-all placeholder:text-gray-400 text-gray-900 dark:text-white resize-none"></textarea>
                        </div>

                        <button type="submit" className="w-full bg-brand-blue text-white font-bold text-lg py-4 rounded-xl hover:bg-brand-dark hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg hover:shadow-xl mt-4">
                            Send Message
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
