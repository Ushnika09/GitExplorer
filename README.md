🧭 GitExplorer - Full Stack GitHub Repository Explorer
📋 Overview

GitExplorer is a modern full-stack platform built with the MERN stack that helps developers explore, analyze, and organize GitHub repositories. The application integrates real-time GitHub API data with personalized features like bookmarking, custom notes, and analytics dashboards — creating a one-stop solution for efficient GitHub exploration.

✨ Features

User Authentication - Secure login/logout system with JWT

Trending Repositories - Browse trending repos filtered by language & timeframe

Search Functionality - Find repositories or GitHub users in real time

Bookmarks - Save repositories with personal notes for later reference

Analytics Dashboards - Visual insights into language distribution, popularity & bookmarks

Responsive Design - Optimized for desktop and mobile devices

Modern Developer UI - Clean, fast, and intuitive interface for productivity

🛠️ Tech Stack

Frontend: React.js, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB Atlas

Authentication: JWT (JSON Web Token)

Deployment: Netlify (Frontend), Render (Backend)

🚀 Live Demo

Frontend: https://gitexplorer09.netlify.app/

Backend API: Hosted on Render

Source Code: GitHub Repository

🚀 Installation & Setup (Windows)
Prerequisites

Node.js (v14 or higher) - Download here

Git for Windows - Download here

Code Editor (VS Code recommended)

1. Clone the Repository
git clone https://github.com/Ushnika09/GitExplorer.git
cd GitExplorer


Backend Setup - Navigate and Install Dependencies

cd backend
npm install


Backend Setup - Create Environment File

echo MONGO_URI=your_mongodb_connection_string> .env
echo PORT=5000>> .env
echo JWT_SECRET=GitExplorer09>> .env
echo NODE_ENV=development>> .env


Backend Setup - Start Server

npm run dev


Frontend Setup - Navigate and Install Dependencies

cd ../frontend
npm install


Frontend Setup - Start Development Server

npm start

📁 Project Structure
GitExplorer/
├── backend/
├── frontend/
└── README.md

🔧 Environment Variables
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=GitExplorer09
NODE_ENV=development


🌐 Deployment
Frontend: Netlify - https://gitexplorer09.netlify.app/

Backend: Render

Database: MongoDB Atlas

⚡ Note: GitHub API limits repository data to 1000 results (100 per request). However, all user bookmarks remain fully accessible without restrictions.
