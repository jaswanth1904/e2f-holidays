import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const adminExists = await Admin.findOne({ username: 'admin' });

        if (adminExists) {
            console.log('Admin user already exists!');
        } else {
            const admin = new Admin({
                username: 'admin',
                password: 'password123'
            });
            await admin.save();
            console.log('Admin user created successfully! Username: admin, Password: password123');
        }

        process.exit();
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
