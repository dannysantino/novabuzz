const { gql } = require('apollo-server');

module.exports = gql`
    type Post {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }
    type Query {
        getPosts: [Post]
    }
    input RegisterInput {
        username: String!
        email: String!
        password: String!
        confirmPassword: String!
    }
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
    }
`