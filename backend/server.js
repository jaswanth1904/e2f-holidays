import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';

import authRoutes from './routes/authRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import featureRoutes from './routes/featureRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Configure CORS for Express
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        const allowedOrigins = [
            'https://e2fholidays.com', 
            'https://www.e2fholidays.com', 
            'http://localhost:5173', 
            'http://127.0.0.1:5173', 
            'http://localhost:5174', 
            'http://127.0.0.1:5174'
        ];
        if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions));

// Configure Socket.io
const io = new Server(httpServer, {
    cors: corsOptions
});

// Pass io to request object so routes can use it
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Socket.io connection and visitor tracking logic
let activeVisitors = 0;
io.on('connection', (socket) => {
    activeVisitors++;
    io.emit('visitor_count_updated', activeVisitors);

    socket.on('disconnect', () => {
        activeVisitors = Math.max(0, activeVisitors - 1);
        io.emit('visitor_count_updated', activeVisitors);
    });
});

// Security Middlewares
app.use(helmet({ crossOriginResourcePolicy: false })); // Allow cross-origin API access

// Rate Limiting to prevent brute-force attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

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
app.use('/api/enquiries', enquiryRoutes);

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/e2f-holidays';

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('MongoDB connection error:', error.message));

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
