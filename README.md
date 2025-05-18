# Hippo - Restaurant Reservation System

Hippo is a full-stack restaurant reservation application as part of a college assignment. The application is built with Expo (React Native) for the frontend and Node.js/Express for the backend. This application allows users to browse restaurants, make reservations, and manage their bookings.

<img src="Assets/overview.gif" width="200"/>

> [!NOTE]
> Hippo is a temporary name for the application. Hence the folder naming.

## Features

### User Features

- User authentication (register/login)
- Browse restaurant listings
- View detailed restaurant information
- Make restaurant reservations
- View and manage existing reservations
- Update or cancel reservations
- View restaurant locations on maps

### Restaurant Features

- Detailed restaurant profiles
- Location information with maps
- Available time slots for reservations
- Capacity management
- Restaurant images and descriptions

## Technical Architecture

### Frontend (Expo/React Native)

The frontend is built using Expo and React Native, providing a cross-platform mobile application with the following key components:

#### Core Components

- **Authentication System**

  > - Login/Signup functionality
  > - Token-based authentication
  > - Protected routes
  > - Session management
  <img src="Assets/login.gif" width="200"/>

- **Restaurant Browsing**

  > - Restaurant listings
  > - Detailed restaurant views
  > - Image galleries
  > - Location maps
  <img alt="Restaurant list" src="Assets/restaurants.gif" width="200"/>

- **Reservation System**

  > - Interactive booking calendar
  > - Time slot selection
  > - Party size selection
  > - Reservation management
  > - Booking confirmation
  <img src="Assets/book.gif" width="200"/>

- **User Profile**
  > - View active reservations
  > - Update reservation details
  > - Cancel reservations
  > - User information management
  <img src="Assets/update_cancel.gif" width="200"/>

### Backend (Node.js/Express)

The backend is built with Node.js and Express, providing a RESTful API with the following features:

#### API Endpoints

- **Authentication**

  - `/auth/register` - User registration
  - `/auth/login` - User login
  - `/auth/profile` - User profile management

- **Restaurants**

  - `/restaurants` - List all restaurants
  - `/restaurants/:id` - Get restaurant details
  - Restaurant management endpoints (CRUD operations)

- **Reservations**
  - `/reservations` - List user reservations
  - `/reservations/:id` - Get reservation details
  - Reservation management endpoints (CRUD operations)

## Installation & Setup

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd Hippo-Front
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd Hippo-Back
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```

## Environment Variables

### Frontend

Create a `.env` file in the frontend directory with:

```js
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY = your_api_key;
```

### Backend

Create a `.env` file in the backend directory with:

```js
PORT = your_preferred_port;
JWT_SECRET = your_jwt_secret;
DB_HOST = your_db_host;
DB_USER = your_db_username;
DB_PASSWORD = your_db_password;
DB_NAME = your_db_name;
```

## Technologies Used

### Frontend

- Expo/React Native
- TypeScript
- React Navigation
- Expo Router
- React Native Maps
- Date-fns for date manipulation

### Backend

- Node.js
- Express.js
- JWT for authentication
- PostgreSQL database
- Express middleware for request handling

## Security Features

- JWT-based authentication
- Protected API endpoints
- Secure password handling
- Input validation
- Error handling middleware
