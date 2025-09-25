# Mitt Arv Blog Application

## About the Project

This project is a full-stack web application developed for the Software Engineering Internship at Mitt Arv. The application enables users to register, login, create blog posts, search posts, add comments, and manage their profile. It aims to provide a seamless legacy-tech blogging experience aligned with Mitt Arv’s vision.

## Tech Stack

- Frontend: React.js with Redux for state management
- Backend: Node.js, Express, MongoDB (Mongoose)
- Authentication: JWT-based user authentication and authorization
- Deployment: (Add your deployment platforms here, e.g., Render, Vercel)

## Features

- User registration and login with protected routes
- Create, read, update, delete blog posts
- Search blog posts by title and tags
- Add comments on individual posts
- User profile page to view user info and authored posts
- Responsive and clean UI (tailwind CSS removed in favor of custom CSS)

## Project Structure

mittarv-blog-venu/
│
├── backend/ # Express backend with REST APIs
│ ├── models/ # Mongoose models (User, Post)
│ ├── routes/ # API routes
│ ├── middleware/ # Authentication middleware
│ ├── server.js # Entry point for backend server
│ └── .env # Environment variables (not included in git)
│
├── frontend/ # React frontend
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # React pages (Home, Login, Profile, PostDetail)
│ │ ├── features/ # Redux state slices
│ │ ├── api/ # Axios instance setup
│ │ ├── index.css # Global CSS styles
│ │ └── App.jsx # Main app component with router
│ └── package.json
│
└── README.md # This file

text

## Setup and Installation

### Backend

1. Navigate to the backend directory:

cd backend

text

2. Install dependencies:

npm install

text

3. Create a `.env` file with your MongoDB connection string and JWT secret.

4. Start the backend server:

node server.js

text

### Frontend

1. Navigate to the frontend directory:

cd frontend

text

2. Install dependencies:

npm install

text

3. Start the frontend development server:

npm run dev

text

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## AI Assistance

This project was developed with the help of AI assistance for troubleshooting, code generation, and best practices recommendations. AI was consulted to:
- Fix issues with Tailwind CSS integration.
- Implement comments and search features.
- Optimize Redux and React components.
- Prepare submission materials.

## Demo

A demo video/screenshots of the app functionality is available at: https://www.linkedin.com/posts/venu-chandaka-147n513_internship-softwareengineering-projectdemo-activity-7376989738760790016-re2m?utm_source=share&utm_medium=member_android&rcm=ACoAAEnV6LcBJE1UjlKUpMs2VtEg1uFpM9DXGZQ

## Future Enhancements

- Add user avatars and image uploads.
- Implement pagination for posts.
- Enhance UI responsiveness and accessibility.
- Add email notifications for comments.

## Contact

For any queries or feedback, please contact: venuchandaka513@gmail.com

---

Thank you for considering my internship assignment application.
