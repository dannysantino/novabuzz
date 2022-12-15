# Novabuzz Social Media App

Novabuzz is a social media app is a social media app built with the following technologies:

- MongoDB
- Apollo Server
- Apollo Client
- React.js
- Node.js
- Bootstrap
- GraphQL
- SemanticUI
- JWT

You can visit the live deployment [here](https://novasocial.netlify.app)

## Features

- Authentication

Novabuzz uses JWT to provide secure authentication for users. This means that you can trust that your account and information are safe when you use the app.

- Comments

One of the core features of Novabuzz is the ability to leave comments on posts. This allows users to engage with each other and have discussions about the content they are sharing.

- Likes

Users can also like posts on Novabuzz to show their appreciaition for the content. This is a quick and easy way to let others know that you enjoy their posts.

## Getting Started

1. Clone the repository

    `https://github.com/dannysantino/website-project-social-media-app.git`

2. Install dependencies

    ```
    cd server
    npm install

    cd ../client
    npm install
    ```

3. Set up a MongoDB database and add your connection string, along with a secret key for JWT to a `.env` file in the server directory

    `touch .env`
    
    Input the following
    ```
    DB_URL=[your_mongodb_url]
    SECRET_KEY=[your_secret_key]
    ```

4. Create another `.env` file in the client directory and add the url for the API server

    `REACT_APP_API_BASE_URL=http://localhost:8000`

5. Start the development servers

    From the root directory, run `cd server && npm start`. And in a separate terminal, run `cd client && npm start`

The backend and frontend servers should be running on http://localhost:8000 and http://localhost:3000 respectively

## Contributing

If you would like to contribute to this project, please follow these guidelines:
- Fork the repository
- Test your changes thoroughly to ensure they work as expected
- Open a pull request and describe your changes

All contributions are greatly appreciated!