import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, User, Clock } from 'lucide-react';

const blogPosts = [
    {
        id: 1,
        title: "The Unspoken Magic of Kyoto in Autumn",
        excerpt: "Beyond the red maples lies a world of silent temples and tea ceremonies that define tranquility.",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop",
        date: "Oct 12, 2024",
        author: "Elena Fisher",
        readTime: "6 min read",
        category: "Culture",
        link: "https://www.japan-guide.com/e/e2158.html"
    },
    {
        id: 2,
        title: "Why The Maldives is More Than Just Beaches",
        excerpt: "Discover the vibrant marine life and local culture that thrives beyond the overwater villas.",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1000&auto=format&fit=crop",
        date: "Sep 28, 2024",
        author: "Marc Johnson",
        readTime: "4 min read",
        category: "Luxury",
        link: "https://visitmaldives.com/en"
    },
    {
        id: 3,
        title: "The Serene Backwaters of Kerala",
        excerpt: "Cruise through the emerald waters of Alleppey and discover why it's called God's Own Country.",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1000&auto=format&fit=crop",
        date: "Sep 15, 2024",
        author: "Sophia Rossi",
        readTime: "8 min read",
        category: "Nature",
        link: "https://www.keralatourism.org/"
    }
];

const Blog = () => {
    return (
        <section id="blog" className="py-24 px-6 md:px-12 bg-white dark:bg-black transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-brand-teal dark:text-brand-yellow font-bold tracking-widest uppercase text-xs mb-3 block">Travel Journal</span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 font-display">
                        Stories from the <span className="font-script font-normal text-5xl md:text-6xl text-gray-400">Road</span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        Insider tips, hidden gems, and tales of adventure to inspire your next getaway.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogPosts.map((post, idx) => (
                        <motion.a
                            key={post.id}
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.2 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer flex flex-col h-full block"
                        >
                            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-6">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <span className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                                    {post.category}
                                </span>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-gray-400 mb-3 font-medium uppercase tracking-wider">
                                <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                                <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-brand-blue transition-colors leading-tight font-display">
                                {post.title}
                            </h3>

                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                                {post.excerpt}
                            </p>

                            <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white group-hover:translate-x-2 transition-transform">
                                Read Article <ArrowUpRight size={16} />
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;
