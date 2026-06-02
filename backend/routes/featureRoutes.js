import express from 'express';
import Feature from '../models/Feature.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get all features/services
// @route   GET /api/features
// @access  Public
router.get('/', async (req, res) => {
    try {
        const features = await Feature.find({});
        res.json(features);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create a feature
// @route   POST /api/features
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const feature = new Feature(req.body);
        const createdFeature = await feature.save();
        res.status(201).json(createdFeature);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Update a feature
// @route   PUT /api/features/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
    try {
        const feature = await Feature.findById(req.params.id);
        if (feature) {
            Object.assign(feature, req.body);
            const updatedFeature = await feature.save();
            res.json(updatedFeature);
        } else {
            res.status(404).json({ message: 'Feature not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Delete a feature
// @route   DELETE /api/features/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const feature = await Feature.findByIdAndDelete(req.params.id);
        if (feature) {
            res.json({ message: 'Feature removed' });
        } else {
            res.status(404).json({ message: 'Feature not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
