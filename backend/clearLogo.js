import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Settings from './models/Settings.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/e2f-holidays';

const clearLogo = async () => {
    await mongoose.connect(MONGO_URI);
    await Settings.updateOne({}, { $set: { logo: '' } });
    console.log('Logo cleared from DB');
    process.exit(0);
}
clearLogo();
