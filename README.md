# Development Platforms Course Assignment

This is my course assignment for Development Platforms at Noroff.

For this assignment, I chose Option 1 and created a REST API using Express and TypeScript. The API uses a MySQL database to store users and articles. Users can register and log in, and authenticated users can submit articles using JWT authentication.

## Technologies

- Express.js
- TypeScript
- MySQL
- mysql2
- JSON Web Token (JWT)
- bcrypt
- Zod
- dotenv
- CORS

## Installation

Clone the repository and install the dependencies:

```bash
npm install
```

Create a `.env` file in the root of the project and add the required variables:

```env
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
PORT=
JWT_SECRET=
```

The exported MySQL database is included in the repository as:

```text
development_platforms_ca.sql
```

## Running the project

To run the project in development mode:

```bash
npm run dev
```

To build the TypeScript project:

```bash
npm run build
```

To run the compiled project:

```bash
npm start
```

## API endpoints

### Authentication

`POST /auth/register`

Registers a new user. The request body requires an email and password.

Example:

```json
{
    "email": "user@example.com",
    "password": "Password123!"
}
```

`POST /auth/login`

Logs in an existing user and returns a token that can be used to post articles.

Example:

```json
{
    "email": "user@example.com",
    "password": "Password123!"
}
```

### Articles

`GET /articles`

Returns all articles. This endpoint has public access.

`POST /articles`

Creates a new article. This endpoint is protected and requires a valid bearer token from logging in.

Example:

```json
{
    "title": "My article",
    "body": "Article content",
    "category": "General"
}
```

## Database

The project uses two MySQL tables:

- `users` stores the registered users and their password hash.
- `articles` stores articles.

Passwords are hashed with bcrypt.

## Validation and authentication

Zod is used to validate incoming requests. Registration requires a valid email address and a password that meets the password requirements. Article submissions require a title, body and category.

JWT is used for authentication. After a successful login, the returned token can be used to access the protected `POST /articles` endpoint.
