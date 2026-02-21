import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Quote, Star, Send, CheckCircle } from 'lucide-react';

const reviewsData = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Luxury Traveler",
        review: "The trip to Bali was absolutely magical! Every detail was taken care of perfectly. I've never experienced such seamless service before.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
        rating: 5
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Adventure Enthusiast",
        review: "Incredible service from start to finish. The team at E2F Holidays really knows their stuff. The hidden gems they suggested were the highlight of our trip.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        rating: 5
    },
    {
        id: 3,
        name: "Emily Davis",
        role: "Honeymooner",
        review: "Our honeymoon in Switzerland was a dream come true. Highly recommend specifically for couples! The romantic dinner arrangements were exquisite.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
        rating: 5
    },
    {
        id: 4,
        name: "David Wilson",
        role: "Family Vacation",
        review: "Everything was seamless. From flights to hotels, we didn't have to worry about a thing. It was the most relaxing family holiday we've had in years.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
        rating: 4
    }
];

const Card = ({ data, index, moveToEnd }) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-150, 0, 150], [-5, 0, 5]);
    const opacity = useTransform(x, [-150, 0, 150], [0.8, 1, 0.8]);

    const handleDragEnd = (event, info) => {
        if (Math.abs(info.offset.x) > 100) {
            moveToEnd();
        }
    };

    const isTop = index === 0;

    return (
        <motion.div
            layout
            drag={isTop ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.05}
            onDragEnd={handleDragEnd}
            style={{
                zIndex: reviewsData.length - index,
                x: isTop ? x : 0,
                rotate: isTop ? rotate : 0,
                opacity: opacity
            }}
            animate={{
                scale: 1 - index * 0.04,
                y: index * 12,
                opacity: index < 3 ? 1 : 0,
            }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 25,
                mass: 1.2, // Adds a bit of weight for a premium feel
            }}
            className={`absolute top-0 w-full bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl p-8 md:p-12 flex flex-col items-center text-center border border-gray-100 dark:border-gray-800 h-[400px] md:h-[450px] justify-center ${isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"}`}
        >
            {/* Decorative Quotes */}
            <div className="absolute top-10 right-12 text-brand-red/20 dark:text-brand-red/10">
                <Quote size={80} className="rotate-180 fill-current" />
            </div>

            <div className="absolute bottom-10 left-12 text-brand-yellow/20 dark:text-brand-yellow/10">
                <Quote size={80} className="fill-current" />
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <h3 className="text-brand-red font-script text-3xl md:text-4xl mb-6">Client Says</h3>

                <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl italic leading-relaxed mb-8 max-w-lg">
                    "{data.review}"
                </p>

                <div className="flex gap-1 text-brand-yellow mb-4">
                    {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-xl ${i < data.rating ? "fill-current" : "text-gray-300"}`}>★</span>
                    ))}
                </div>

                <div className="flex flex-col items-center mt-2">
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">{data.name}</h4>
                    <span className="text-brand-teal text-sm font-medium uppercase tracking-wider">{data.role}</span>
                </div>
            </div>
        </motion.div>
    );
};

const FeedbackForm = ({ onAddReview }) => {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [review, setReview] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create new review object
        const newReview = {
            id: Date.now(),
            name: name || "Anonymous Traveler",
            role: role || "Traveler",
            review: review,
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop", // Generic avatar
            rating: rating || 5
        };

        // Add the review to the list immediately
        onAddReview(newReview);

        setSubmitted(true);
        // Reset form
        setName('');
        setRole('');
        setReview('');
        setRating(0);

        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800 h-full">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Share Your Story</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Tell us about your journey with E2F Holidays.</p>

            {submitted ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-64 flex flex-col items-center justify-center text-center text-brand-teal"
                >
                    <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle size={32} />
                    </div>
                    <h4 className="text-xl font-bold mb-2">Thanks for sharing!</h4>
                    <p className="text-gray-500">Your review is now live.</p>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-gray-400 ml-1">Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-blue outline-none transition-all placeholder:text-gray-400 text-gray-900 dark:text-white"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-gray-400 ml-1">Trip / Package</label>
                            <input
                                type="text"
                                placeholder="e.g. Bali Getaway"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-blue outline-none transition-all placeholder:text-gray-400 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-gray-400 ml-1">Rate your experience</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    className="focus:outline-none transition-transform hover:scale-110"
                                >
                                    <Star
                                        size={28}
                                        className={`${star <= (hoveredRating || rating) ? "fill-brand-yellow text-brand-yellow" : "text-gray-300 dark:text-gray-700"}`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-gray-400 ml-1">Your Review</label>
                        <textarea
                            rows="4"
                            placeholder="What was the highlight of your trip?"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-blue outline-none transition-all placeholder:text-gray-400 text-gray-900 dark:text-white resize-none"
                            required
                        ></textarea>
                    </div>

                    <button className="w-full py-4 bg-gradient-to-r from-brand-blue to-brand-teal hover:from-brand-blue/90 hover:to-brand-teal/90 text-white font-bold rounded-xl shadow-lg transform transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2">
                        Submit Review <Send size={18} />
                    </button>
                </form>
            )}
        </div>
    );
};

const CustomerReviews = () => {
    const [cards, setCards] = useState(reviewsData);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-cycle effect
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCards((prev) => {
                const newCards = [...prev];
                const movedCard = newCards.shift();
                newCards.push(movedCard);
                return newCards;
            });
        }, 4000); // Auto-slide every 4 seconds

        return () => clearInterval(interval);
    }, [isPaused]);

    const moveToEnd = () => {
        setCards((prev) => {
            const newCards = [...prev];
            const movedCard = newCards.shift();
            newCards.push(movedCard);
            return newCards;
        });
    };

    const addReview = (newReview) => {
        setCards((prev) => {
            return [newReview, ...prev];
        });
    };

    return (
        <section id="testimonials" className="py-24 px-4 bg-gray-50 dark:bg-black overflow-hidden relative transition-colors duration-500">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                    src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=60&w=1200&auto=format&fit=crop"
                    alt="Travel Background"
                    loading="lazy"
                    className="w-full h-full object-cover opacity-10 dark:opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50/90 via-transparent to-gray-50/90 dark:from-black/90 dark:via-transparent dark:to-black/90"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <span className="text-brand-teal dark:text-brand-yellow font-bold tracking-widest uppercase text-xs mb-3 block">
                        Client Stories
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white font-display">
                        What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-yellow">Travelers Say</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Swipe Stack */}
                    <div
                        className="flex flex-col items-center"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <div className="relative w-full max-w-xl h-[480px] flex items-center justify-center">
                            {cards.map((card, index) => (
                                <Card
                                    key={card.id}
                                    data={card}
                                    index={index}
                                    moveToEnd={moveToEnd}
                                />
                            ))}
                        </div>
                        <p className="mt-8 text-sm text-gray-400 flex items-center gap-2">
                            <span className="animate-pulse">←</span> Drag card or wait to read more <span className="animate-pulse">→</span>
                        </p>
                    </div>

                    {/* Right Column: Feedback Form */}
                    <div>
                        <FeedbackForm onAddReview={addReview} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomerReviews;
