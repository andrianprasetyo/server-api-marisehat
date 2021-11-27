# MariSehat API Server (Express + Mongoose)

## Getting started

To get the Node server running locally:

- Clone this repo
- Get Azure subscriptions and provision Azure Web App, CosmosDB, and Container for Blob
- `.env` for Configuration Environment variables  
- `npm install` to install all required dependencies
- `npm run dev` to start the local server

## Code Overview

### Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Bcrypt password hashing function to easily create a hash out of a password string.
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 
- [multer-azure-blob-storage](https://github.com/symphonicc/multer-azure-blob-storage) - Multer storage engine for Azure's blob storage
- [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) - Generates swagger/openapi specification based on jsDoc comments and YAML files.
- [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) - serve auto-generated swagger-ui generated API docs from express, based on a swagger.json file.

## Application Structure

- `app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our Mongoose models.
- `controllers/` - This folder contains the controllers for our API & Auth.
- `middlewares/` - This folder contains the middlewars for authenticate request.

## Authentication

Requests are authenticated using the `Authorization` header with a valid JWT. Express middlewares in `middlewares/isAuth.js` be used to authenticate requests.