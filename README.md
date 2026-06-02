<div align="center">
  <img src="https://images.pexels.com/photos/5138790/pexels-photo-5138790.jpeg?auto=compress&cs=tinysrgb&w=800&q=60" alt="E2F Holidays Hero" width="100%" style="border-radius: 12px; margin-bottom: 20px;" />
  
  # 🌍 E2F Holidays - Travel & Tourism Platform

  <p><strong>A modern, high-performance Full-Stack Travel Agency website equipped with a custom-built Content Management System (CMS) and Admin Dashboard.</strong></p>

  [![React](https://img.shields.io/badge/React-18-blue.svg?style=flat&logo=react)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-Backend-green.svg?style=flat&logo=nodedotjs)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/Express-5.x-lightgrey.svg?style=flat&logo=express)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248.svg?style=flat&logo=mongodb)](https://www.mongodb.com/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
  [![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5.svg?style=flat&logo=cloudinary)](https://cloudinary.com/)
</div>

<hr />

## 📖 About The Project

**E2F Holidays** is a premium, fully responsive travel agency platform designed to wow customers with stunning aesthetics while giving agency owners 100% control over their content without touching a line of code.

Instead of relying on third-party CMS platforms (like Sanity or WordPress), this project features a **custom-built, highly secure Admin Dashboard** powered by a Node.js/MongoDB backend. The admin portal allows live, instant updates to homepage graphics, travel packages, customer testimonials, and contact information.

## ✨ Key Features

### 🏢 Customer Facing Frontend
- **Stunning UI/UX**: Built with Tailwind CSS, utilizing glassmorphism, dynamic gradients, and smooth scroll animations (`framer-motion`).
- **Dynamic Hero Section**: Features a Typewriter effect with an Indian tricolor gradient and dynamic background images pulled straight from the Admin portal.
- **Next-Gen Image Optimization**: Integrates Cloudinary to automatically serve dynamically compressed, responsive WebP images based on screen size (`f_auto, q_auto`).
- **SEO & Performance**: Lazy-loaded components, preloaded critical assets, and full OpenGraph/SEO meta tags for maximum Google Search visibility.
- **Dark Mode Support**: Seamless toggle between Light and Dark themes.

### 🔐 Secure Admin Dashboard (CMS)
- **Analytics Overview**: Visual traffic and inquiry tracking using `Recharts`.
- **Full CRUD Management**: Create, Read, Update, and Delete Travel Packages, Destinations, and Customer Reviews directly from the UI.
- **Global Settings Editor**: Change the website's logo, hero text, hero background image, phone numbers, and social links instantly.
- **Cloudinary Integration**: Direct image uploads from the Admin panel to the Cloudinary CDN.
- **JWT Authentication**: Secure login portal protecting all backend API routes.

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| **Frontend** | React 18 (Vite), Tailwind CSS, Framer Motion, Recharts, Lucide React, React Router |
| **Backend** | Node.js, Express.js (v5), Mongoose |
| **Database** | MongoDB Atlas |
| **Security** | Helmet, Express Rate Limit, JWT (JSON Web Tokens), bcryptjs |
| **Media & Storage** | Cloudinary, Multer |

## 🛡️ Enterprise Security

The backend is hardened for production deployment using industry-standard security practices:
- **Helmet**: Secures Express apps by setting various HTTP headers.
- **Express Rate Limit**: Protects APIs against brute-force and DDoS attacks.
- **NoSQL Injection Prevention**: Mongoose strict casting prevents malicious object injections.
- **CORS Protection**: Strictly configured Cross-Origin Resource Sharing allowing only trusted frontend domains in production.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB URI
- Cloudinary Account (API Key, Secret, Cloud Name)

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/e2f-holidays.git
   cd e2f-holidays
   ```

2. **Setup the Backend**
   ```sh
   cd backend
   npm install
   ```
   Create a `.env` file in the `/backend` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   NODE_ENV=development
   ```
   Run the backend server:
   ```sh
   npm run dev
   ```

3. **Setup the Frontend**
   ```sh
   cd ../frontend
   npm install
   ```
   Run the frontend development server:
   ```sh
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`. To access the admin portal, navigate to `http://localhost:5173/admin`.

## 📈 Performance Optimizations

- **React Suspense & Lazy Loading**: Below-the-fold components are code-split and loaded asynchronously to reduce the initial JavaScript bundle size.
- **Cloudinary On-the-fly Compression**: The custom `optimizeImage` utility rewrites image URLs to enforce WebP format and reduce image sizes by up to 80% before they hit the browser.

---
<div align="center">
  <i>Designed and developed with precision for E2F Holidays.</i>
</div>
