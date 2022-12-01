import React, { useContext, useRef, useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Form, Grid, Icon, Image, Label } from 'semantic-ui-react'
import moment from 'moment'

import LikeButton from '../components/LikeButton'
import DeleteButton from '../components/DeleteButton'
import { AuthContext } from '../context/auth'
import MyPopup from '../utilities/MyPopup'

const SinglePost = () => {
    const { postId } = useParams();

    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const commentInputRef = useRef(null);

    const [comment, setComment] = useState('');

    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    });

    const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
        update() {
            setComment('');
            commentInputRef.current.blur();
        },
        variables: {
            postId,
            body: comment
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
            <Grid centered>
                <Grid.Row>
                    <Grid.Column mobile={4} tablet={2} computer={2}>
                        <Image
                            size='small'
                            floated='right'
                            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                        />
                    </Grid.Column>
                    <Grid.Column mobile={12} tablet={10} computer={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton user={user} post={{ id, likes, likeCount }} />
                                <MyPopup content={'Comment on post'}>
                                    <Button as='div' labelPosition='right'>
                                        <Button basic color='blue'>
                                            <Icon name='comments' />
                                        </Button>
                                        <Label basic color='blue' pointing='left'>{commentCount}</Label>
                                    </Button>
                                </MyPopup>
                                {user && user.username === username && (
                                    <DeleteButton postId={id} callback={deletePostCallback} />
                                )}
                            </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                    <p>Post a comment</p>
                                    <Form>
                                        <div className='ui action input fluid'>
                                            <input
                                                type='text'
                                                name='comment'
                                                placeholder='Comment...'
                                                value={comment}
                                                onChange={e => setComment(e.target.value)}
                                                ref={commentInputRef}
                                            />
                                            <button
                                                type='submit'
                                                className='ui button teal'
                                                disabled={comment.trim() === ''}
                                                onClick={createComment}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </Form>
                                </Card.Content>

                            </Card>
                        )}
                        {comments.map(c => (
                            <Card fluid key={c.id}>
                                <Card.Content>
                                    {user && user.username === c.username && (
                                        <DeleteButton postId={id} commentId={c.id} />
                                    )}
                                    <Card.Header>{c.username}</Card.Header>
                                    <Card.Meta>{moment(c.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{c.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
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

const CREATE_COMMENT_MUTATION = gql`
    mutation($postId: ID!, $body: String!) {
        createComment(postId: $postId, body: $body) {
            id
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
