export const optimizeImage = (url, width = 800) => {
    if (!url) return '';
    
    // Cloudinary optimization
    if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
        return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
    }
    
    // Pexels optimization
    if (url.includes('images.pexels.com')) {
        return `${url.split('?')[0]}?auto=compress&cs=tinysrgb&w=${width}&q=60`;
    }
    
    return url;
};
