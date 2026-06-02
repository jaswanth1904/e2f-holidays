import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true }
}, { timestamps: true });

const Feature = mongoose.model('Feature', featureSchema);

export default Feature;
