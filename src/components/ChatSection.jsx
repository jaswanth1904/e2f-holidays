import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Send, MoreHorizontal } from 'lucide-react';

const themes = {
    imessage: {
        name: 'iMessage',
        senderColor: 'bg-blue-500',
        receiverColor: 'bg-gray-200 dark:bg-zinc-800',
        senderText: 'text-white',
        receiverText: 'text-gray-900 dark:text-white',
        bg: 'bg-white dark:bg-black',
        bubbleShape: 'rounded-2xl',
    },
    whatsapp: {
        name: 'WhatsApp',
        senderColor: 'bg-[#005c4b]',
        receiverColor: 'bg-[#202c33]',
        senderText: 'text-white',
        receiverText: 'text-white',
        bg: 'bg-[#0b141a]',
        bubbleShape: 'rounded-lg',
    },
    messenger: {
        name: 'Messenger',
        senderColor: 'bg-gradient-to-r from-blue-500 to-purple-600',
        receiverColor: 'bg-gray-200 dark:bg-zinc-800',
        senderText: 'text-white',
        receiverText: 'text-gray-900 dark:text-white',
        bg: 'bg-white dark:bg-black',
        bubbleShape: 'rounded-3xl',
    },
};

const chatSequence = [
    { type: 'receiver', text: 'Welcome to E2F Holidays! 🌍 How can we help you plan your dream vacation today?' },
    { type: 'sender', text: 'Hi! I was looking at your South India packages. They look amazing!' },
    { type: 'receiver', text: 'Thank you! South India is magical. 🥥 Any specific destination in mind?' },
    { type: 'sender', text: 'I really want to visit Kerala. The backwaters look serene.' },
    { type: 'receiver', text: 'Great choice! Our "Kerala Bliss" package covers Munnar, Thekkady, and a houseboat stay in Alleppey. 🚤' },
    { type: 'sender', text: 'That sounds perfect. Is it customizable?' },
    { type: 'receiver', text: 'Absolutely! We tailor every itinerary to your preferences. ✨ Shall we send you a quote?' },
    { type: 'sender', text: 'Yes, please! Let\'s go!' },
];

const TypingIndicator = ({ theme }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`p-4 w-16 mb-4 ${theme.receiverColor} ${theme.bubbleShape} rounded-tl-none self-start`}
    >
        <div className="flex gap-1 justify-center">
            {[0, 1, 2].map((dot) => (
                <motion.div
                    key={dot}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.2 }}
                    className={`w-2 h-2 rounded-full ${theme.name === 'WhatsApp' ? 'bg-gray-400' : 'bg-gray-500'}`}
                />
            ))}
        </div>
    </motion.div>
);

const ChatBubble = ({ message, theme }) => {
    const isSender = message.type === 'sender';
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className={`max-w-[75%] px-4 py-2 mb-2 text-sm shadow-sm ${theme.bubbleShape} ${isSender
                ? `${theme.senderColor} ${theme.senderText} self-end rounded-br-none`
                : `${theme.receiverColor} ${theme.receiverText} self-start rounded-tl-none`
                }`}
        >
            {message.text}
        </motion.div>
    );
};

const ChatSection = () => {
    const theme = themes.imessage; // Default theme

    const [visibleMessages, setVisibleMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    // Track current message index and mounted state
    const currentIndexRef = useRef(0);
    const containerRef = useRef(null);
    const scrollAreaRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const isMounted = useRef(true);

    // Auto-scroll to bottom of chat container ONLY
    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [visibleMessages, isTyping]);

    // Sequence Engine
    useEffect(() => {
        isMounted.current = true;
        if (!isInView) return;

        const processNextMessage = () => {
            if (!isMounted.current) return;

            if (currentIndexRef.current < chatSequence.length) {
                const nextMessage = chatSequence[currentIndexRef.current];
                const isUser = nextMessage.type === 'sender';

                // Typing delay logic
                const typingDuration = isUser ? 800 : 1500;
                const pauseBeforeTyping = isUser ? 500 : 200;

                setTimeout(() => {
                    if (!isMounted.current) return;
                    setIsTyping(true);

                    setTimeout(() => {
                        if (!isMounted.current) return;
                        setIsTyping(false);
                        setVisibleMessages(prev => [...prev, nextMessage]);
                        currentIndexRef.current += 1;

                        // Recursive call for next message
                        processNextMessage();
                    }, typingDuration);
                }, pauseBeforeTyping);
            }
        };

        // Start the sequence if not already started
        if (currentIndexRef.current === 0) {
            processNextMessage();
        }

        return () => { isMounted.current = false; };
    }, [isInView]);

    return (
        <section id="chat-experience" className="py-24 px-4 transition-colors duration-500 bg-gray-50 dark:bg-gray-900 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">

                {/* Text Content */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <span className="text-brand-teal font-bold tracking-widest uppercase text-xs mb-3 block">
                        Seamless Communication
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 font-display leading-tight">
                        We're Always <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-teal">
                            Here For You
                        </span>
                    </h2>
                    <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                        Planning a trip should be as easy as chatting with a friend. From instant itinerary customizations to on-trip support, E2F Holidays ensures you're never alone on your journey. Drop us a mail at <a href="mailto:hello@e2fholidays.com" className="text-brand-blue hover:underline">hello@e2fholidays.com</a>
                    </p>
                </div>

                {/* Phone Mockup */}
                <div className="w-full md:w-1/2 flex justify-center perspective-1000">
                    <motion.div
                        ref={containerRef}
                        initial={{ rotateY: 15, rotateX: 5, opacity: 0 }}
                        whileInView={{ rotateY: 0, rotateX: 0, opacity: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="relative w-[320px] h-[600px] bg-black rounded-[3rem] p-3 shadow-2xl border-4 border-gray-800 ring-4 ring-gray-900/50"
                    >
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-black rounded-b-xl z-20"></div>

                        <div className={`w-full h-full ${theme.bg} rounded-[2.5rem] overflow-hidden flex flex-col relative transition-colors duration-300`}>

                            {/* Chat Header */}
                            <div className={`p-4 pt-10 ${theme.name === 'WhatsApp' ? 'bg-[#202c33]' : 'bg-white/80 dark:bg-black/80 backdrop-blur-md'} z-10 border-b border-gray-100/10 flex items-center justify-between absolute top-0 w-full shadow-sm`}>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-teal to-brand-blue flex items-center justify-center text-white font-bold text-xs">
                                        E2F
                                    </div>
                                    <div>
                                        <h4 className={`text-sm font-bold ${theme.name === 'WhatsApp' ? 'text-white' : 'text-gray-900 dark:text-white'}`}>E2F Support</h4>
                                        <div className="flex items-center gap-1">
                                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                            <p className="text-[10px] text-gray-500 font-medium">Online</p>
                                        </div>
                                    </div>
                                </div>
                                <MoreHorizontal size={20} className="text-gray-400" />
                            </div>

                            {/* Chat Area */}
                            <div ref={scrollAreaRef} className="flex-1 overflow-y-auto px-4 pt-24 pb-20 flex flex-col scrollbar-hide">
                                <AnimatePresence mode="popLayout">
                                    {visibleMessages.map((msg, idx) => (
                                        <ChatBubble key={idx} message={msg} theme={theme} />
                                    ))}
                                </AnimatePresence>

                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="self-start"
                                    >
                                        <TypingIndicator theme={theme} />
                                    </motion.div>
                                )}
                            </div>

                            {/* Input Area */}
                            <div className={`absolute bottom-0 w-full p-4 ${theme.name === 'WhatsApp' ? 'bg-[#202c33]' : 'bg-white/90 dark:bg-black/90 backdrop-blur-md'} border-t border-gray-100/10`}>
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${theme.name === 'WhatsApp' ? 'bg-[#2a3942]' : 'bg-gray-100 dark:bg-zinc-800'}`}>
                                    <input
                                        type="text"
                                        disabled
                                        placeholder="Type a message..."
                                        className="bg-transparent border-none outline-none text-sm w-full text-gray-500"
                                    />
                                    <div className={`p-1.5 rounded-full ${theme.senderColor} text-white`}>
                                        <Send size={14} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ChatSection;
