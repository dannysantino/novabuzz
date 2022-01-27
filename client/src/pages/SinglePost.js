import React, { useContext } from 'react'
import { gql, useQuery } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Grid, Icon, Image, Label } from 'semantic-ui-react'
import moment from 'moment'

import LikeButton from '../components/LikeButton'
import DeleteButton from '../components/DeleteButton'
import { AuthContext } from '../context/auth'

const SinglePost = () => {
    const { postId } = useParams();

    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    });

    const deletePostCallback = () => {
        navigate('/');
    }

    let postMarkup;

    if (!data) {
        postMarkup = <p>Loading post...</p>
    } else {
        const { id, username, body, createdAt, likes, likeCount, comments, commentCount } = data.getPost;
        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            size='small'
                            floated='right'
                            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton user={user} post={{ id, likes, likeCount }} />
                                <Button as='div' labelPosition='right' onClick={() => console.log('Comment on post')}>
                                    <Button basic color='blue'>
                                        <Icon name='comments' />
                                    </Button>
                                    <Label basic color='blue' pointing='left'>{commentCount}</Label>
                                </Button>
                                {user && user.username === username && (
                                    <DeleteButton postId={id} callback={deletePostCallback} />
                                )}
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    return postMarkup;
}

const FETCH_POST_QUERY = gql`
    query($postId: ID!) {
        getPost(postId: $postId) {
            id
            username
            body
            createdAt
            likes {
                username
            }
            likeCount
            comments {
                id
                username
                body
                createdAt
            }
            commentCount
        }
    }
`

export default SinglePost
