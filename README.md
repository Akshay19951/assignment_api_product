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