import { motion } from 'framer-motion';
import { ShieldCheck, AlertCircle, FileText, Lock } from 'lucide-react';

const Legal = () => {
    return (
        <div className="pt-32 pb-24 bg-gray-50 dark:bg-black min-h-screen">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-gray-800"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-brand-blue/10 p-3 rounded-2xl">
                            <ShieldCheck className="text-brand-blue" size={32} />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight">Privacy & Terms</h1>
                    </div>

                    <div className="space-y-12">
                        {/* No Refund Policy */}
                        <section className="scroll-mt-24" id="refund-policy">
                            <div className="flex items-center gap-2 mb-4 text-brand-red">
                                <AlertCircle size={24} />
                                <h2 className="text-2xl font-black uppercase tracking-wider">No Refund Policy</h2>
                            </div>
                            <div className="bg-brand-red/5 border-l-4 border-brand-red p-6 rounded-r-xl shadow-inner">
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-semibold text-lg">
                                    Kindly note that <span className="text-brand-red uppercase">all bookings are final</span>.
                                </p>
                                <p className="mt-3 text-gray-600 dark:text-gray-400">
                                    Due to the nature of pre-planned travel logistics involving cruise cabins, flight seats, and hotel reservations
                                    which are booked and paid for in advance, E2F Holidays <span className="font-bold">cannot offer any refunds, returns, or credits</span>
                                    once a booking is confirmed and payment is received.
                                </p>
                            </div>
                        </section>

                        {/* Scam Warning */}
                        <section className="scroll-mt-24" id="scam-prevention">
                            <div className="flex items-center gap-2 mb-4 text-brand-yellow">
                                <Lock size={24} />
                                <h2 className="text-2xl font-black uppercase tracking-wider">Don't Get Scammed</h2>
                            </div>
                            <div className="bg-brand-yellow/5 border-l-4 border-brand-yellow p-6 rounded-r-xl shadow-inner">
                                <p className="text-gray-900 dark:text-white leading-relaxed font-bold mb-3">
                                    ⚠️ STAY VIGILANT: PROTECT YOURSELF FROM FRAUD
                                </p>
                                <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm list-disc pl-5">
                                    <li><span className="font-bold">E2F Holidays</span> will never ask for your <span className="text-brand-red">OTP, PIN, or Password</span> via phone, email, or chat.</li>
                                    <li>Never share screen-sharing codes (like AnyDesk or TeamViewer) with anyone claiming to be our representative.</li>
                                    <li>Ensure all payments are made only through the <span className="underline">official payment links</span> on our website or to our official company bank accounts.</li>
                                    <li>We do not have any independent "freelance" agents collecting cash on our behalf.</li>
                                </ul>
                                <p className="mt-4 text-xs text-gray-500 italic">
                                    If you encounter any suspicious activity, please immediately report it to <a href="mailto:e2fhoildays@gmail.com" className="text-brand-blue font-bold hover:underline">e2fhoildays@gmail.com</a>.
                                </p>
                            </div>
                        </section>

                        {/* Terms and Conditions */}
                        <section>
                            <div className="flex items-center gap-2 mb-4 text-brand-teal">
                                <FileText size={20} />
                                <h2 className="text-xl font-bold uppercase tracking-wider">Terms of Service</h2>
                            </div>
                            <div className="space-y-4 text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
                                <p>
                                    1. <span className="text-gray-900 dark:text-white font-semibold">Intermediary Status:</span> E2F Holidays acts as an agent between travelers and service providers (Airlines, Hotels, Cruise Lines).
                                    We are not liable for service changes or cancellations made by these third-party providers.
                                </p>
                                <p>
                                    2. <span className="text-gray-900 dark:text-white font-semibold">Travel Documents:</span> It is the sole responsibility of the passenger to ensure they have valid Passports (6+ months validity), Visas,
                                    and Health Certificates required for the destination.
                                </p>
                                <p>
                                    3. <span className="text-gray-900 dark:text-white font-semibold">Booking & Payments:</span> Bookings are only considered "Confimed" once the full payment is received.
                                    Partial payments do not guarantee price lock-ins as rates are subject to change by providers.
                                </p>
                                <p>
                                    4. <span className="text-gray-900 dark:text-white font-semibold">Itinerary Changes:</span> While we strive to follow the plan, E2F Holidays reserves the right to make minor adjustments
                                    to the itinerary due to weather, traffic, or unforeseen local conditions.
                                </p>
                            </div>
                        </section>

                        {/* Privacy Policy */}
                        <section className="border-t border-gray-100 dark:border-gray-800 pt-8">
                            <h2 className="text-xl font-bold mb-4 opacity-50">Privacy Policy</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm italic">
                                We value your privacy. Your personal information (name, contact, travel history) is stored securely and is only shared with
                                the necessary service providers (hotels, airlines) to facilitate your travel. We do not sell your data to third-party advertisers.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Legal;
