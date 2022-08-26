import React from 'react'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, concat } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = new HttpLink({
    uri: 'https://novasocialmedia.herokuapp.com/'
});

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authLink, httpLink)
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)