import express from 'express';
import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '30d',
    });
};

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });

        if (admin && (await admin.matchPassword(password))) {
            res.json({
                _id: admin._id,
                username: admin.username,
                token: generateToken(admin._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Register a new admin (Setup only, can be disabled later)
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        const adminExists = await Admin.findOne({ username });
        if (adminExists) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const admin = await Admin.create({ username, password });
        if (admin) {
            res.status(201).json({
                _id: admin._id,
                username: admin.username,
                token: generateToken(admin._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid admin data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update admin credentials
// @route   PUT /api/auth/update
// @access  Private
router.put('/update', protect, async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin._id);

        if (admin) {
            const { currentPassword, newPassword, newUsername } = req.body;

            // Verify current password first
            if (!(await admin.matchPassword(currentPassword))) {
                return res.status(401).json({ message: 'Invalid current password' });
            }

            // Update fields if provided
            if (newUsername) {
                // Check if username is already taken by another admin
                const usernameExists = await Admin.findOne({ username: newUsername });
                if (usernameExists && usernameExists._id.toString() !== admin._id.toString()) {
                    return res.status(400).json({ message: 'Username already taken' });
                }
                admin.username = newUsername;
            }

            if (newPassword) {
                admin.password = newPassword;
            }

            const updatedAdmin = await admin.save();

            res.json({
                _id: updatedAdmin._id,
                username: updatedAdmin.username,
                token: generateToken(updatedAdmin._id),
            });
        } else {
            res.status(404).json({ message: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
