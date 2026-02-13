import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FAQItem = ({ question, answer }) => {
    return (
        <details className="group border-b border-gray-200 dark:border-gray-800 py-6 text-gray-900 dark:text-white transition-colors duration-500">
            <summary className="flex justify-between items-center cursor-pointer list-none text-xl font-medium group-hover:text-brand-blue transition-colors">
                <span>{question}</span>
                <span className="transform transition-transform group-open:rotate-180 group-open:text-brand-teal">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </summary>
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl"
            >
                {answer}
            </motion.div>
        </details>
    );
};

const FAQ = () => {
    const faqs = [
        { question: "Do you offer customizable packages?", answer: "Yes, every trip is a blank canvas. Tell us your interests, and we'll paint the itinerary." },
        { question: "What is your refund policy?", answer: "We offer flexible cancellation policies depending on the package type. Most bookings are fully refundable up to 14 days before departure." },
        { question: "Is travel insurance included?", answer: "Basic travel insurance is included in our premium packages. For standard packages, we offer it as an optional add-on." },
        { question: "Can I book flights only?", answer: "Absolutely. We provide standalone flight booking services with access to corporate rates on major airlines." },
    ];

    return (
        <section className="py-24 px-6 md:px-12 bg-white dark:bg-black transition-colors duration-500">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-900 dark:text-white">Your Questions, <span className="text-gray-400">Answered.</span></h2>
                <div>
                    {faqs.map((faq, idx) => (
                        <FAQItem key={idx} {...faq} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
