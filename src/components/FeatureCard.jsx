import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FeatureCard = ({ title, desc, icon: Icon, extraClasses, index }) => {
    const scrollRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start end", "end start"]
    });

    const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15]);

    return (
        <motion.div
            ref={scrollRef}
            initial={{ opacity: 0, y: 50 + index * 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className={`relative p-8 md:p-12 rounded-[2rem] border overflow-hidden group cursor-pointer backdrop-blur-3xl transition-all ${extraClasses}`}
        >
            <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 flex items-center justify-center mb-8 border border-white/20 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    <Icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">{title}</h3>
                    <p className="text-sm md:text-base leading-relaxed opacity-80">{desc}</p>
                </div>
            </div>

            {/* Background radial gradient effect on hover */}
            <div
                className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            />
        </motion.div>
    );
};

export default FeatureCard;
