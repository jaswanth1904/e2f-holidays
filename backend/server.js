import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/authRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import featureRoutes from './routes/featureRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

const app = express();

// Security Middlewares
app.use(helmet()); // Set security HTTP headers

// Rate Limiting to prevent brute-force attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// CORS configuration (allow frontend only in prod)
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://e2fholidays.com', 'https://www.e2fholidays.com', 'https://e2f-holidays.vercel.app'] 
        : ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:5174', 'http://127.0.0.1:5174', 'https://e2f-holidays.vercel.app'],
    credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Health Check for Render Deployment
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/features', featureRoutes);
app.use('/api/upload', uploadRoutes);

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/e2f-holidays';

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('MongoDB connection error:', error.message));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
