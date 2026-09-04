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

## AI Log

**Tool used:** ChatGPT
**Date:** 1 September 2026
**Purpose:** Making a checklist of the brief and grading criteria.
**Outcome:** A visual representation of how the organizing of a project in my mind looks.

**Tool used:** ChatGPT
**Date:** 1 September 2026
**Purpose:** Double checking that my tables in MySQL where correct.
**Outcome:** Reassurance that they were correct

**Tool used:** ChatGPT
**Date:** 2 September 2026
**Purpose:** Debugging error with typescript. “Property 'user' does not exist on type 'Request'” Which then reminded me that we’d learned this in chapter 3.3.
**Outcome:** Help to remember where to find the solution to the problem.

**Tool used:** ChatGPT
**Date:** 3 September 2026
**Purpose:** Debugging error with Typescript. Node setting for moduleResolution was no longer supported.
**Outcome:** Changed moduleResolution from “node” to “bundler”.

**Tool used:** ChatGPT
**Date:** 4 September 2026
**Purpose:** Help make the README.md look “pretty”.
**Outcome:** I learned to format code using markdown (and I also realized that I knew a lot of it from before).

**Tool used:** ChatGPT
**Date:** 4 September 2026
**Purpose:** Help removing `node_modules` from github repository.
**Outcome:** Learned how to stop tracking folder using `git rm -r --cached`
