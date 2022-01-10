if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log("DATABASE CONNECTED!")
        return server.listen({ port: 8000 })
    })
    .then(res => console.log(`Server running on ${res.url}`));