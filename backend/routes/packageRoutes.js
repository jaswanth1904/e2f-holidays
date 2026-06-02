import express from 'express';
import Package from '../models/Package.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
router.get('/', async (req, res) => {
    try {
        const packages = await Package.find({});
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get package by ID (slug)
// @route   GET /api/packages/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const pkg = await Package.findOne({ id: req.params.id });
        if (pkg) {
            res.json(pkg);
        } else {
            res.status(404).json({ message: 'Package not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create a package
// @route   POST /api/packages
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const newPackage = new Package(req.body);
        const createdPackage = await newPackage.save();
        res.status(201).json(createdPackage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Update a package
// @route   PUT /api/packages/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
    try {
        const pkg = await Package.findOne({ id: req.params.id });
        if (pkg) {
            Object.assign(pkg, req.body);
            const updatedPackage = await pkg.save();
            res.json(updatedPackage);
        } else {
            res.status(404).json({ message: 'Package not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Delete a package
// @route   DELETE /api/packages/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const pkg = await Package.findOneAndDelete({ id: req.params.id });
        if (pkg) {
            res.json({ message: 'Package removed' });
        } else {
            res.status(404).json({ message: 'Package not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
