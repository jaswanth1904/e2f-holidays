import express from 'express';
import Settings from '../models/Settings.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get global settings
// @route   GET /api/settings
// @access  Public
router.get('/', async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            // Create default settings if none exist
            settings = await Settings.create({});
        }
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update global settings
// @route   PUT /api/settings
// @access  Private
router.put('/', protect, async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = new Settings(req.body);
            const createdSettings = await settings.save();
            return res.status(201).json(createdSettings);
        }

        Object.assign(settings, req.body);
        const updatedSettings = await settings.save();
        res.json(updatedSettings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
