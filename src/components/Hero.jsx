import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const heroImages = [
    "https://images.pexels.com/photos/5138790/pexels-photo-5138790.jpeg?auto=compress&cs=tinysrgb&w=1920&q=75", // India Gate / Monument
    "https://images.pexels.com/photos/1646870/pexels-photo-1646870.jpeg?auto=compress&cs=tinysrgb&w=1920&q=75", // Taj Mahal
    "https://images.pexels.com/photos/774282/pexels-photo-774282.jpeg?auto=compress&cs=tinysrgb&w=1920&q=75", // Beach
    "https://images.pexels.com/photos/2309271/pexels-photo-2309271.jpeg?auto=compress&cs=tinysrgb&w=1920&q=75", // Mountains
    "https://images.pexels.com/photos/34779145/pexels-photo-34779145.jpeg?auto=compress&cs=tinysrgb&w=1920&q=75", // Culture
    "https://images.pexels.com/photos/13452880/pexels-photo-13452880.jpeg?auto=compress&cs=tinysrgb&w=1920&q=75" // Nature
];

const Typewriter = ({ words, typeSpeed = 100, deleteSpeed = 50, delay = 1500 }) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);
    const [blink, setBlink] = useState(true);

    // Blinking cursor effect
    useEffect(() => {
        const timeout2 = setInterval(() => {
            setBlink((prev) => !prev);
        }, 500);
        return () => clearInterval(timeout2);
    }, []);

    // Typing logic
    useEffect(() => {
        if (index === words.length) return; // Should not happen if looped

        if (subIndex === words[index].length + 1 && !reverse) {
            const timeout = setTimeout(() => {
                setReverse(true);
            }, delay);
            return () => clearTimeout(timeout);
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, reverse ? deleteSpeed : typeSpeed);

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, words, typeSpeed, deleteSpeed, delay]);

    return (
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#138808]">
            {words[index].substring(0, subIndex)}
            <span className={`text-[#ffffff] ml-1 ${blink ? "opacity-100" : "opacity-0"}`}>|</span>
        </span>
    );
};

const Hero = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 4000); // 5 seconds per slide
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-screen flex flex-col justify-center items-center text-center pt-[120px] bg-black overflow-hidden transform-gpu">

            {/* Auto Carousel Background */}
            <div className="absolute inset-0 w-full h-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImage}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <img
                            src={heroImages[currentImage]}
                            className="absolute inset-0 w-full h-full object-cover"
                            alt="India Tourism Destinations"
                        />

                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center">

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-6xl md:text-8xl lg:text-[9rem] font-black text-white tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl font-display"
                >
                    EXPLORE <br />
                    <Typewriter
                        words={["THE WORLD", "PARADISE", "ADVENTURE", "CULTURE"]}
                        typeSpeed={100}
                        deleteSpeed={50}
                        delay={1500}
                    />
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-2xl text-gray-200 max-w-2xl font-light tracking-wide leading-relaxed mb-10 drop-shadow-lg"
                >
                    Just pack and go, leave the rest to us.
                </motion.p>
            </div>
        </div>
    );
};

export default Hero;
