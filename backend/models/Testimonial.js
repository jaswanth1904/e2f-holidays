import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String },
    review: { type: String, required: true },
    rating: { type: Number, default: 5 },
    image: { type: String } // Image URL
}, { timestamps: true });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
