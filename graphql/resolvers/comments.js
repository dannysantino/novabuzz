const { UserInputError, AuthenticationError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../utilities/check-auth');

module.exports = {
    Mutation: {
        createComment: async (_, { postId, body }, context) => {
            const { username } = checkAuth(context);
            if (body.trim() === '') {
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Comment body cannot be empty'
                    }
                })
            }
            const post = await Post.findById(postId);
            if (post) {
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                })
                await post.save();
                return post;
            }
            throw new UserInputError('Post not found');
        },
        deleteComment: async (_, { postId, commentId }, context) => {
            const { username } = checkAuth(context);
            const post = await Post.findById(postId);
            if (post) {
                let i = post.comments.findIndex(c => c.id === commentId);
                if (post.comments[i].username === username) {
                    post.comments.splice(i, 1);
                    await post.save();
                    return post;
                } else {
                    throw new AuthenticationError('Access denied');
                }
            }
            throw new UserInputError('Post not found');
        }
    }
}