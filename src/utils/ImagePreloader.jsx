import { useEffect } from 'react';
import { heroImages } from '../components/Hero';
import { cruisePackages, tourPackages } from '../data/packages';
import { southIndiaPackages } from '../data/southIndiaPackages';

const ImagePreloader = () => {
    useEffect(() => {
        const imagesToPreload = [
            ...heroImages,
            ...cruisePackages.slice(0, 4).map(p => p.image),
            ...tourPackages.slice(0, 4).map(p => p.image),
            ...southIndiaPackages.slice(0, 4).map(p => p.image)
        ];

        imagesToPreload.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    return null;
};

export default ImagePreloader;
