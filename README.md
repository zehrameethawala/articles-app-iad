# Blog Application

A full-stack blog application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- User authentication (register/login)
- Profile picture upload
- Create and view blog articles
- User-specific content
- Responsive design

## Setup

1. Clone the repository:
```bash
git clone https://github.com/username/repo-name.git
cd repo-name
```

2. Install dependencies:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd 
npm install
```

3. Create a .env file in the server directory:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=6001
```

4. Start the application:
```bash
# Start server (from server directory)
npm run dev

# Start client (from client directory)
npm run dev
```

## Technologies Used

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
- File Upload: Multer
