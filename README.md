# Movie Ticket Booking System

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup and Installation](#setup-and-installation)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Screenshots](#screenshots)
8. [Future Enhancements](#future-enhancements)
9. [Contributing](#contributing)
10. [License](#license)

---

## Introduction
The **Movie Ticket Booking System** is a web-based application designed to allow users to explore movies, view showtimes, and book tickets. Administrators can manage movies efficiently by adding, editing, and deleting movie details.

---

## Features

### User Features
- Browse a list of movies with detailed descriptions.
- View showtimes for selected movies.
- Book tickets (future enhancement).

### Admin Features
- Add, edit, or delete movies.
- Monitor movie bookings (future enhancement).

### General Features
- User-friendly and intuitive UI.
- Responsive design for desktop and mobile use.
- Clear success and error messages for actions.

---

## Technologies Used
- **Frontend**: React.js, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Additional Tools**:
  - Axios for API communication
  - React Router for navigation

---

## Setup and Installation

### Prerequisites
- Node.js installed (v14 or later).
- MongoDB installed and running locally or remotely.

### Installation Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/movie-ticket-booking.git
   cd movie-ticket-booking

# Install dependencies:

# Backend:
npm install

# Frontend:
cd client
npm install

# Set up environment variables:

# Create a .env file in the root directory:
echo "PORT=5000" >> .env
echo "MONGO_URI=<your-mongodb-connection-string>" >> .env

# Start the server:
npm start

# Start the frontend:
cd client
npm start

# Usage

# Admin:
# Navigate to `/admin` to access the admin dashboard.
# Add, edit, or delete movies.

# User:
Browse movies on the homepage.
View movie details and available showtimes.
Book tickets (future enhancement).

# API Endpoints

# Movies:
# Fetch all movies:
curl -X GET http://localhost:5000/api/movies

# Add a new movie (Admin only):
curl -X POST http://localhost:5000/api/movies -H "Content-Type: application/json" -d '{"title":"Sample Movie","description":"Sample description"}'

# Update movie details (Admin only):
curl -X PUT http://localhost:5000/api/movies/:id -H "Content-Type: application/json" -d '{"title":"Updated Title"}'

# Delete a movie (Admin only):
curl -X DELETE http://localhost:5000/api/movies/:id

# Future Enhancements:
Secure payment gateway integration.
Seat selection functionality.
Email confirmation for bookings.
User reviews and ratings for movies.

# Contributing:

# Fork the repository.

# Create a new feature branch:
git checkout -b feature/your-feature-name

# Commit your changes:
git commit -m "Add your message here"

# Push to your branch:
git push origin feature/your-feature-name

# Create a Pull Request.


# Screenshots
![Screenshot 2024-12-04 125832](https://github.com/user-attachments/assets/7610be47-625b-4db6-9b01-28fa780b995a)
![Screenshot 2024-12-04 125841](https://github.com/user-attachments/assets/04beebc7-df9b-4a1e-ba84-ea1d3e84ea9e)
![Screenshot 2024-12-04 125901](https://github.com/user-attachments/assets/7a9cbbc4-9515-46aa-98af-2d69cc5c596d)
![Screenshot 2024-12-04 125910](https://github.com/user-attachments/assets/91a1c18c-4321-4a29-be9a-107fe70ce13f)
![Screenshot 2024-12-04 125942](https://github.com/user-attachments/assets/fa51a565-dd76-45a6-95c5-9905274c5f43)
![Screenshot 2024-12-04 130031](https://github.com/user-attachments/assets/0a91c00a-3a6f-4adb-936b-4195a637d837)
![Screenshot 2024-12-04 130040](https://github.com/user-attachments/assets/fa3e4979-1862-45b2-a871-1a9d3ce34073)

