import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, Icon, Label, Image } from 'semantic-ui-react'
import moment from 'moment'

const PostCard = ({ post: { id, username, body, createdAt, likeCount, likes, commentCount } }) => {
    const likePost = () => console.log("Post liked!");
    const commentPost = () => console.log("Commented!")
    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta style={{ marginBottom: 15 }}>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description as={Link} to={`/posts/${id}`}>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button as='div' labelPosition='right' onClick={likePost}>
                    <Button basic color='teal'>
                        <Icon name='heart' />
                    </Button>
                    <Label basic color='teal' pointing='left'>
                        {likeCount}
                    </Label>
                </Button>
                <Button as='div' labelPosition='right' onClick={commentPost}>
                    <Button basic color='blue'>
                        <Icon name='comments' />
                    </Button>
                    <Label as='a' basic color='blue' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
            </Card.Content>
        </Card>
    )
}

export default PostCard