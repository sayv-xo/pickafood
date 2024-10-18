# Pick-a-Food
## A food ordering service


## Overview

This is a RESTful API built with Express.js, MongoDB for data persistence, and Redis for token management. The application provides user authentication and menu ordering functionalities, supporting operations for user registration, login, logout, menu management, and order processing.

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v20 or higher)
- **MongoDB** (Running locally or via a cloud service like MongoDB Atlas)
- **Redis** (Running locally or on a cloud service like Redis Labs)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/sayv-xo/pickafood.git
    cd pickafood
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file at the root of the project and configure the following:
    ```bash
    API_PORT = 3000
    DB_HOST = localhost
    DB_PORT = 27017
    DB_NAME = pickafood
    JWT_SECRET = your_secret_key
    ```

4. Start the MongoDB and Redis servers.

5. Run the application:
    ```bash
    npm run start-server
    ```

## API Documentation

### Authentication Routes

- **POST /register**
  - Registers a new user.
  - **Body**: 
    ```json
    {
      "username": "john_doe",
      "email": "johndoe@example.com",
      "password": "yourpassword"
    }
    ```
  - **Response**: 
    ```json
    {
      "user": "john_doe",
      "token": "Bearer your_token"
    }
    ```

- **GET /login**
  - Logs in an existing user using Basic Auth (either `username` or `email`).
  - **Headers**:
    ```
    Authorization: Basic base64(username:password) or base64(email:password)
    ```
  - **Response**:
    ```json
    {
      "user": "john_doe",
      "token": "Bearer your_token"
    }
    ```

- **GET /me**
  - Retrieves authenticated user info.
  - **Headers**:
    ```
    x-token: Bearer your_token
    ```
  - **Response**:
    ```json
    {
      "username": "john_doe",
      "email": "johndoe@example.com"
    }
    ```

- **GET /logout**
  - Logs out the user by invalidating the token in Redis.
  - **Headers**:
    ```
    x-token: Bearer your_token
    ```
  - **Response**:
    ```json
    {
      "message": "Successfully logged out"
    }
    ```

### Menu Routes

- **POST /menus**
  - Creates a new menu item.
  - **Body**: 
    ```json
    {
      "name": "Pizza",
      "price": 10.99,
      "category": "Food"
    }
    ```
  - **Response**: 
    ```json
    {
      "id": "menu_item_id",
      "name": "Pizza",
      "price": 10.99,
      "category": "Food"
    }
    ```

- **GET /menus**
  - Retrieves all menu items.
  - **Response**: 
    ```json
    [
      {
        "id": "menu_item_id",
        "name": "Pizza",
        "price": 10.99,
        "category": "Food"
      },
      ...
    ]
    ```

### Order Routes

- **POST /orders**
  - Places an order.
  - **Body**: 
    ```json
    {
      "items": [
        {
          "name": "Pizza",
          "quantity": 2
        }
      ]
    }
    ```
  - **Response**: 
    ```json
    {
      "orderId": "order_id",
      "items": [
        {
          "name": "Pizza",
          "quantity": 2
        }
      ]
    }
    ```

- **GET /orders**
  - Retrieves the user's orders.
  - **Headers**:
    ```
    x-token: Bearer your_token
    ```
  - **Response**: 
    ```json
    [
      {
        "orderId": "order_id",
        "items": [
          {
            "name": "Pizza",
            "quantity": 2
          }
        ]
      },
    ]
    ```

### Status Route

- **GET /status**
  - Checks the status of the app.
  - **Response**: 
    ```json
    {
      "status": "OK"
    }
    ```

## Technologies Used

- **Node.js**: Backend framework
- **Express.js**: Routing and middleware
- **MongoDB**: NoSQL database for storing user, menu, and order information
- **Redis**: In-memory store for session management (token storage)

## Running Tests

To run the test suite:
```bash
npm test
```

## Future Enhancements (To-Do List)

1. **Role-based Access Control**: 
   - Implement roles such as `Admin` and `User` to allow restricted access to certain endpoints (e.g., only Admins can add new menu items).

2. **Frontend Implementation**:
   - Build a user-friendly frontend for interacting with the API, using React.js or any modern JavaScript framework.
   - Integrate with the backend to display menu items, place orders, and manage users.

3. **Email Notifications**:
   - Send email confirmations upon user registration and order placements using a service like Nodemailer.

4. **Order Tracking**:
   - Enhance the order system to allow real-time tracking of placed orders.

5. **Payment Integration**:
   - Integrate a payment gateway such as Stripe or PayPal for handling orders involving real transactions.

6. **Dockerization**:
   - Create a `Dockerfile` and `docker-compose.yml` for easy deployment and scaling of the app with MongoDB and Redis services.

---
