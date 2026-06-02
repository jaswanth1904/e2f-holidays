import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
    siteTitle: { type: String, default: 'E2F Holidays' },
    contactEmail: { type: String, default: 'e2fhoildays@gmail.com' },
    contactPhone: { type: String, default: '+919642810644' },
    heroHeading: { type: String, default: 'EXPLORE THE WORLD' },
    heroSubheading: { type: String, default: 'Just pack and go, leave the rest to us.' },
    aboutText: { type: String, default: 'Welcome to E2F Holidays.' },
    heroImage: { type: String },
    logo: { type: String },
    socialLinks: {
        facebook: { type: String },
        twitter: { type: String },
        instagram: { type: String }
    }
}, { timestamps: true });

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;
