import React from 'react'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:8000'
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)