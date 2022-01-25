import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Grid } from 'semantic-ui-react'

import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import { AuthContext } from '../context/auth'
import { FETCH_POSTS_QUERY } from '../utilities/graphql'

const Home = () => {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);
    const { user } = useContext(AuthContext);
    return (
        <Grid columns={3}>
            <Grid.Row className='page-title'>
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}
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

export default Home
