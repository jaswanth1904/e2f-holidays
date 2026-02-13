import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

/**
 * AnimatedCounter Component
 * 
 * Animaties a number from 0 (or a specified start) to a target value when in view.
 * 
 * Props:
 * - value: The target number to animate to (required).
 * - direction: "up" or "down" (default: "up").
 * - duration: Animation duration in seconds (default: 2).
 * - delay: Delay before starting animation (default: 0).
 * - className: Additional CSS classes for styling.
 * - suffix: String to append after the number (e.g., "+", "%", "k").
 */
const AnimatedCounter = ({ value, direction = "up", duration = 2, delay = 0, className = "", suffix = "" }) => {
    const ref = useRef(null);
    const motionValue = useMotionValue(direction === "down" ? value : 0);
    const springValue = useSpring(motionValue, {
        damping: 60,
        stiffness: 100,
        duration: duration * 1000,
    });
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            setTimeout(() => {
                motionValue.set(direction === "down" ? 0 : value);
            }, delay * 1000);
        }
    }, [isInView, motionValue, direction, value, delay]);

    useEffect(() => {
        // Sync the spring value with the DOM element for smooth counting
        return springValue.on("change", (latest) => {
            if (ref.current) {
                // If the target value is a decimal (e.g. 4.9), format with 1 decimal place
                if (value % 1 !== 0) {
                    ref.current.textContent = latest.toFixed(1) + suffix;
                } else {
                    // Otherwise format as integer with commas
                    ref.current.textContent = Math.floor(latest).toLocaleString() + suffix;
                }
            }
        });
    }, [springValue, suffix, value]);

    return <span ref={ref} className={className} />;
};

export default AnimatedCounter;
