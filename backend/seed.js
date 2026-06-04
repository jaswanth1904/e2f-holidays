import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Package from './models/Package.js';
import Settings from './models/Settings.js';
import Testimonial from './models/Testimonial.js';
import Feature from './models/Feature.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/e2f-holidays';

const seedData = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB for Seeding...');

        // Clear existing data
        await Package.deleteMany();
        await Settings.deleteMany();
        await Testimonial.deleteMany();
        await Feature.deleteMany();

        // Seed Settings
        await Settings.create({
            siteTitle: 'E2F Holidays Admin Portal',
            contactEmail: 'contact@e2fholidays.com',
            contactPhone: '+1 (555) 123-4567',
            heroHeading: 'Discover Your Next Great Adventure',
            heroSubheading: 'Premium holiday packages tailored just for you.',
            aboutText: 'We provide the best experiences for your holidays.',
            logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        });

        // Seed Packages
        await Package.insertMany([
            {
                id: 'pkg-1',
                title: 'Maldives Paradise Resort',
                category: 'tour',
                duration: '5 Days, 4 Nights',
                destination: 'Male, Maldives',
                price: 1499,
                description: 'Experience luxury in the heart of the Indian Ocean with our all-inclusive Maldives package.',
                image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                inclusions: ['Flight', '5-star Hotel', 'Breakfast', 'Airport Transfer'],
                shows: ['Dolphin Watching'],
            },
            {
                id: 'pkg-2',
                title: 'European Historic Tour',
                category: 'tour',
                duration: '10 Days, 9 Nights',
                destination: 'Paris, Rome, London',
                price: 2999,
                description: 'A comprehensive journey through the most historic and beautiful cities in Europe.',
                image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                inclusions: ['EuroRail Pass', 'Hotels', 'Guided Tours'],
                shows: ['Moulin Rouge'],
            },
            {
                id: 'pkg-3',
                title: 'Caribbean Royal Cruise',
                category: 'cruise',
                duration: '7 Days, 6 Nights',
                destination: 'Bahamas & Caribbean',
                price: 1899,
                description: 'Set sail on a luxurious cruise ship through the crystal clear waters of the Caribbean.',
                image: 'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                inclusions: ['All meals', 'Cabin', 'Port fees'],
                shows: ['Broadway Style Show', 'Comedy Club'],
            }
        ]);

        // Seed Testimonials
        await Testimonial.insertMany([
            {
                name: 'Sarah Jenkins',
                review: 'Absolutely the best trip of my life! E2F handled everything perfectly.',
                rating: 5,
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
            },
            {
                name: 'Michael Chen',
                review: 'The European tour was well organized and the guides were fantastic.',
                rating: 4,
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
            }
        ]);

        // Seed Features/Services
        await Feature.insertMany([
            {
                title: 'Premium Accommodation',
                description: 'We partner with the best 5-star hotels globally to ensure your comfort.',
                icon: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
            },
            {
                title: '24/7 Support',
                description: 'Our dedicated team is available around the clock to assist you during your trip.',
                icon: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
            }
        ]);

        console.log('Data Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
