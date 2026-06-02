import express from 'express';
import Testimonial from '../models/Testimonial.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
router.get('/', async (req, res) => {
    try {
        const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create a testimonial
// @route   POST /api/testimonials
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const testimonial = new Testimonial(req.body);
        const createdTestimonial = await testimonial.save();
        res.status(201).json(createdTestimonial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Update a testimonial
// @route   PUT /api/testimonials/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (testimonial) {
            Object.assign(testimonial, req.body);
            const updatedTestimonial = await testimonial.save();
            res.json(updatedTestimonial);
        } else {
            res.status(404).json({ message: 'Testimonial not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
        if (testimonial) {
            res.json({ message: 'Testimonial removed' });
        } else {
            res.status(404).json({ message: 'Testimonial not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
