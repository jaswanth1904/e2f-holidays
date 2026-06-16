import express from 'express';
import nodemailer from 'nodemailer';
import Enquiry from '../models/Enquiry.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/enquiries
// @desc    Submit a new enquiry
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, email, destination, message } = req.body;

        // Save to Database
        const enquiry = await Enquiry.create({
            firstName,
            lastName,
            email,
            destination,
            message
        });

        // Emit real-time notification to admin via Socket.io
        if (req.io) {
            req.io.emit('new_enquiry', enquiry);
        }

        // Send Email using Nodemailer
        try {
            // Configure your SMTP settings here. Using Gmail as an example.
            // For production, you should use env variables (e.g., process.env.EMAIL_USER, process.env.EMAIL_PASS)
            // You will need to generate an "App Password" in your Google Account security settings.
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER || 'info.e2fhoildays@gmail.com', // Fallback or env
                    pass: process.env.EMAIL_PASS || 'your-app-password-here' // We will tell user to set this in .env
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_USER || 'info.e2fhoildays@gmail.com',
                to: process.env.EMAIL_USER || 'info.e2fhoildays@gmail.com', // Send to admin
                subject: `New Travel Enquiry from ${firstName} ${lastName}`,
                html: `
                    <h2>New Enquiry Received</h2>
                    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Destination:</strong> ${destination}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                    <hr/>
                    <p><small>Sent from E2F Holidays Website</small></p>
                `
            };

            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            console.error('Error sending email notification:', emailError.message);
            // We don't throw error here to ensure the user still gets a success response for form submission
        }

        res.status(201).json({ success: true, data: enquiry });

    } catch (error) {
        console.error('Enquiry Submission Error:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// @route   GET /api/enquiries
// @desc    Get all enquiries
// @access  Private/Admin
router.get('/', protect, async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.status(200).json(enquiries);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
