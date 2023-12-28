# Assignment API

This repository contains the implementation of a Node.js and Express API for product management and authentication. The API supports CRUD operations for products and includes authentication features using JSON Web Tokens (JWT). Additionally, unit test cases have been created using the Jest and Supertest packages.

## Prerequisites

Before getting started, ensure that you have the following installed:

- Node.js
- MongoDB

## Installation

1. Unzip the files into any folder.
2. Navigate to the project directory:

    ```bash
    cd your-project-directory
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

## Database Setup

1. Start MongoDB locally or use a remote connection.
2. Open the `app.js` file and replace the MongoDB URL on line number 13:

    ```javascript
    connectToMongoDB("mongodb://127.0.0.1:27017/your-database-name")
    ```

    Replace `your-database-name` with the desired name for your MongoDB database.

## Run the Application

- For development:

    ```bash
    npm run watch
    ```

- For production:

    ```bash
    npm start
    ```

## Unit Testing

Run unit tests:

```bash
npm test
```

## Postman Collection

Access the Postman collection using the following URL:

[Postman Collection](https://api.postman.com/collections/3383541-df315133-7806-4cf5-b796-04f06b2dea59?access_key=PMAT-01HJKRRWXV5ZX0B2R0HTK00674)

## API Documentation

### User

- **Endpoint:** `POST /register`

  **Request:**
  ```json
  {
      "username": "john123",
      "password": "Abc@123"
  }
  ```
  **Response:**
  ```json
  {
    "msg": "User registered successfully!",
    "result": {
        "username": "john123",
        "password": "$2b$10$AonjvnlTPjKVDQwyZ5w/WOSzFCQBjH1r/NfSR0SoGFpKA82OOx6h.",
        "_id": "658b21894e3354c3bfa59995",
        "__v": 0
    }
  }
  ```
- **Endpoint:** `POST /login`

    **Request:**

    ```json
    {
        "username": "john123",
        "password": "Abc@123"
    }
    ```
    **Response:**

    ```json
    {
        "msg": "Login successful!!"
    }
    ```
### Product

- **Endpoint:** `GET /product?orderBy=desc&sortBy=price&size=3&page=2`

  **Response:**
  ```json
    [
        {
            "_id": "658ad0133fe4a5dac97c69dd",
            "name": "product-3",
            "description": "test product 1",
            "price": 200,
            "quantity": 2,
            "__v": 0
        },
        {
            "_id": "658ad045c5ac0e2b841092a8",
            "name": "product-3",
            "description": "test product 1",
            "price": 200,
            "quantity": 2,
            "__v": 0
        }
    ]
  ```
- **Endpoint:** `POST /product`

    **Request:**

    ```json
    {
        "name": "product-101",
        "description": "test product 101",
        "price": 200,
        "quantity": 2
    }

    ```
    **Response:**

    ```json
    {
        "name": "product-101",
        "description": "test product 101",
        "price": 200,
        "quantity": 2,
        "_id": "658b23a84e3354c3bfa599a2",
        "__v": 0
    }
    ```
- **Endpoint:** `Patch /product/:productId`

    **Request:**

    ```json
    {
        "description": "test product 101 - 201",
        "price": 201
    }
    ```
    **Response:**

    ```json
    {
        "msg": "product-4 is updated.",
        "product": {
            "_id": "658ad06ac66faa9f5e35c6af",
            "name": "product-4",
            "description": "test product 101 - 201",
            "price": 201,
            "quantity": 2,
            "__v": 0
        }
    }
    ```
- **Endpoint:** `GET /api/products/:productId`

    **Response:**
    ```json
    [
        {
            "_id": "658ad06ac66faa9f5e35c6af",
            "name": "product-4",
            "description": "test product 101 - 201",
            "price": 201,
            "quantity": 2,
            "__v": 0
        }
    ]
    ```
- **Endpoint:** `DELETE /api/products/:productId`

    **Response:**
    ```json
    {
        "msg": "product-101 deleted from records"
    }
    ```