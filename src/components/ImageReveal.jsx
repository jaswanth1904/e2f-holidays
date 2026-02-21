import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ImageReveal = ({
    src,
    alt,
    className = "",
    density = 8,  // Rows X Cols = Density^2 or separate
    // We want a grid. Let's make it customizable.
    rows = 6,
    cols = 6,
    damping = 25,
    stiffness = 120,
    motionBlur = true // Can be toggled
}) => {
    // Generate tiles array
    const tiles = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            tiles.push({
                id: `${r}-${c}`,
                r,
                c
            });
        }
    }

    // Determine delay based on X + Y for "Wave" effect
    // We want a cascading wave from top-left or center? Top-left is standard "wave".
    // Or staggerChildren?
    // We'll calculate delay per tile.

    return (
        <div
            className={`relative overflow-hidden w-full h-full block ${className}`}
            style={{
                perspective: '1200px', // Crucial for 3D effect depth
                transformStyle: 'preserve-3d',
                cursor: 'pointer' // interactive
            }}
        >
            <div
                className="grid w-full h-full"
                style={{
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    gridTemplateRows: `repeat(${rows}, 1fr)`,
                }}
            >
                {tiles.map((tile) => {
                    // Position calculations for background
                    // Correct percentage logic:
                    // If 4 cols, col 0 is 0%, col 1 is 33.3%, col 2 is 66.6%, col 3 is 100%.
                    // Formula: (colIndex / (cols - 1)) * 100
                    const xPos = cols > 1 ? (tile.c / (cols - 1)) * 100 : 0;
                    const yPos = rows > 1 ? (tile.r / (rows - 1)) * 100 : 0;

                    // Wave Delay Calculation
                    const waveDelay = (tile.c * 0.05) + (tile.r * 0.05); // Diagonal wave

                    return (
                        <motion.div
                            key={tile.id}
                            initial={{
                                opacity: 0,
                                z: 300, // Start far "out" towards user
                                scale: 0.2, // Small
                                rotateX: (Math.random() - 0.5) * 45, // Random tilt
                                rotateY: (Math.random() - 0.5) * 45,
                                filter: motionBlur ? 'blur(10px)' : 'none'
                            }}
                            whileInView={{
                                opacity: 1,
                                z: 0,
                                scale: 1.01, // Slight overlap to prevent 1px gap glitches
                                rotateX: 0,
                                rotateY: 0,
                                filter: 'blur(0px)',
                            }}
                            transition={{
                                type: "spring",
                                damping: damping, // Soft fluid stop
                                stiffness: stiffness, // Low stiffness = loose spring
                                mass: 0.8,
                                delay: waveDelay, // Trigger wave
                                duration: 1.2
                            }}
                            whileHover={{
                                scale: 0.9,
                                z: 50,
                                rotateX: (Math.random() - 0.5) * 20,
                                rotateY: (Math.random() - 0.5) * 20,
                                transition: { duration: 0.2, ease: "easeOut" }
                            }}
                            className="w-full h-full relative"
                            style={{
                                backgroundImage: `url("${src}")`,
                                backgroundSize: `${cols * 100}% ${rows * 100}%`,
                                backgroundPosition: `${xPos}% ${yPos}%`,
                                transformStyle: 'preserve-3d',
                                backfaceVisibility: 'hidden', // Performance optimization
                                willChange: 'transform, opacity' // GPU Hint
                            }}
                        />
                    );
                })}
            </div>

            {/* Screen Reader Only Img */}
            <span className="sr-only">{alt}</span>
        </div>
    );
};

export default ImageReveal;
