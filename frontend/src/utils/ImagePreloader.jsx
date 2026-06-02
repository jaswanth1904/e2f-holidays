import { useEffect } from 'react';
import { heroImages } from '../components/Hero';
import { cruisePackages, tourPackages } from '../data/packages';
import { southIndiaPackages } from '../data/southIndiaPackages';

const ImagePreloader = () => {
    useEffect(() => {
        // Optimization: Defer preloading until the initial page is fully interactive
        const startPreload = () => {
            const getOptimizedUrl = (url, width = 800) => `${url}${url.includes('?') ? '&' : '?'}w=${width}&q=50`;

            const imagesToPreload = [
                // Only preload the next 2 hero images to save bandwidth
                ...heroImages.slice(1, 3).map(src => getOptimizedUrl(src, 1000)),
                ...cruisePackages.slice(0, 2).map(p => getOptimizedUrl(p.image, 600)),
                ...tourPackages.slice(0, 2).map(p => getOptimizedUrl(p.image, 600)),
                ...southIndiaPackages.slice(0, 2).map(p => getOptimizedUrl(p.image, 600))
            ];

            imagesToPreload.forEach(src => {
                const img = new Image();
                img.src = src;
            });
        };

        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(startPreload);
        } else {
            setTimeout(startPreload, 3000); // 3 second delay for non-supported browsers
        }
    }, []);

    return null;
};

export default ImagePreloader;
