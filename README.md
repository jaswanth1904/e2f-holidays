<div align="center">
  
  # E2F Holidays — Enterprise Travel & Content Management Platform

  <p><strong>A high-performance, Full-Stack Travel Agency platform featuring a bespoke Content Management System (CMS) and Secure Analytics Dashboard.</strong></p>

  [![React](https://img.shields.io/badge/React-18-blue.svg?style=flat&logo=react)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-Backend-green.svg?style=flat&logo=nodedotjs)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/Express-5.x-lightgrey.svg?style=flat&logo=express)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248.svg?style=flat&logo=mongodb)](https://www.mongodb.com/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
  [![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5.svg?style=flat&logo=cloudinary)](https://cloudinary.com/)
</div>

<hr />

## Architecture Overview

**E2F Holidays** is a full-stack, decoupled architecture platform engineered to provide a seamless customer experience while affording administrators comprehensive control over site content and business operations. 

Moving away from constrained third-party platforms, this application utilizes a proprietary Node.js and MongoDB backend to securely manage all digital assets, travel packages, global site configuration, and customer testimonials.

## Core Capabilities

### Client-Facing Application
- **Modern Interface Design**: Developed using Tailwind CSS with glassmorphism principles, responsive typography, and Framer Motion for highly optimized scroll transitions.
- **Dynamic Content Injection**: Real-time fetching of hero configurations, available packages, and client reviews directly from the proprietary CMS.
- **Media Optimization**: Integrated Cloudinary CDN architecture providing automatic, on-the-fly image compression and next-generation format delivery (WebP) based on client viewport metrics.
- **Search Engine Optimization (SEO)**: Pre-configured OpenGraph metadata, structured HTML semantics, and optimized asset loading to ensure maximum search indexability.

### Secure Administrative Dashboard
- **Analytics & Reporting**: Live visualization of system traffic and package inquiries utilizing `Recharts`.
- **Content Management (CRUD)**: Intuitive interfaces for the creation, modification, and deletion of travel packages, destination data, and customer feedback.
- **Global Configuration Engine**: Instantaneous administration of site-wide variables, including corporate logos, hero imagery, contact vectors, and social pathways.
- **Security & Authentication**: JSON Web Token (JWT) secured endpoints protecting all administrative routes and data modification payloads.

## Technology Stack

| Architecture Layer | Technologies |
|---|---|
| **Frontend Framework** | React 18 (Vite), Tailwind CSS, Framer Motion, Recharts, Lucide |
| **Backend API** | Node.js, Express.js (v5), Mongoose ODM |
| **Database Engine** | MongoDB Atlas |
| **Security Protocols** | Helmet, Express Rate Limit, JWT, bcryptjs |
| **Media Delivery** | Cloudinary, Multer |

## Enterprise Security Implementation

The backend infrastructure is hardened for robust production deployment against standard threat vectors:
- **Header Protection**: Implemented `helmet` to secure Express applications by setting strict HTTP headers.
- **DDoS Mitigation**: Configured `express-rate-limit` to protect public API endpoints against automated brute-force attempts.
- **Injection Defense**: Enforced strict Mongoose casting to neutralize NoSQL injection vulnerabilities.
- **CORS Policies**: Restricted Cross-Origin Resource Sharing to exclusively permit trusted frontend domain execution.

## Deployment & Local Installation

### Prerequisites
- Node.js Environment (v18+)
- MongoDB Cluster URI
- Cloudinary Storage Credentials (API Key, Secret, Cloud Name)

### Installation Protocol

1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-username/e2f-holidays.git
   cd e2f-holidays
   ```

2. **Backend Configuration**
   ```sh
   cd backend
   npm install
   ```
   Establish a `.env` file within the `/backend` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   NODE_ENV=development
   ```
   Initialize the API server:
   ```sh
   npm run dev
   ```

3. **Frontend Configuration**
   ```sh
   cd ../frontend
   npm install
   ```
   Initialize the client development server:
   ```sh
   npm run dev
   ```

4. **Access Control**: Navigate to `http://localhost:5173` for the client interface, or `http://localhost:5173/admin` to access the secure administrative portal.

---
<div align="center">
  <i>Engineered and deployed for E2F Holidays.</i>
</div>
