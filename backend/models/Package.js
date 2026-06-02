import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // slug or custom ID
    title: { type: String, required: true },
    category: { type: String, required: true, enum: ['cruise', 'tour', 'southIndia'] },
    duration: { type: String },
    destination: { type: String },
    route: { type: String },
    price: { type: Number },
    description: { type: String },
    image: { type: String }, // URL from Cloudinary
    itinerary: [{
        day: { type: Number },
        port: { type: String },
        activity: { type: String }
    }],
    inclusions: [{ type: String }],
    shows: [{ type: String }],
    ship: { type: String },
    otherDetails: { type: String }
}, { timestamps: true });

const Package = mongoose.model('Package', packageSchema);

export default Package;
