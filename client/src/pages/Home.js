import React from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { Grid } from 'semantic-ui-react'

import PostCard from '../components/PostCard'

const Home = () => {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);
    return (
        <Grid columns={3}>
            <Grid.Row className='page-title'>
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h2>Loading posts...</h2>
                ) : (
                    data && data.getPosts.map(e => (
                        <Grid.Column key={e.id} style={{ marginBottom: 20 }}>
                            <PostCard post={e} />
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
    )
}

const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id
            username
            body
            createdAt
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                body
                createdAt
            }
        }
    }
`

export default Home
