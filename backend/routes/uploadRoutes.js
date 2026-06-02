import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Cloudinary configuration relies on process.env being loaded by dotenv in server.js
// If it fails, ensure the CLOUDINARY_* variables are set in .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'e2f-holidays', // Folder name in your Cloudinary account
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'svg'],
    transformation: [{ width: 1200, crop: 'limit' }] // Optionally resize
  },
});

const upload = multer({ storage: storage });

// @desc    Upload an image
// @route   POST /api/upload
// @access  Private
router.post('/', protect, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image file' });
    }
    // Return the secure URL from Cloudinary
    res.json({ url: req.file.path });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
});

export default router;
