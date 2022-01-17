const { AuthenticationError, UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../utilities/check-auth');

module.exports = {
    Query: {
        getPosts: async () => {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        },
        getPost: async (_, { postId }) => {
            try {
                const post = await Post.findById(postId);
                if (post) {
                    return post;
                } else {
                    throw new Error('Post not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        createPost: async (_, { body }, context) => {
            const user = checkAuth(context);
            if (args.body.trim() === '') {
                throw new Error('Post body cannot be empty');
            }
            console.log(user);
            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });
            const post = await newPost.save();
            return post;
        },
        deletePost: async (_, { postId }, context) => {
            const user = checkAuth(context);
            try {
                const post = await Post.findById(postId);
                if (post.username === user.username) {
                    await post.delete();
                    return 'Post successfully deleted!'
                } else {
                    throw new AuthenticationError('Acess denied');
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        likePost: async (_, { postId }, context) => {
            const { username } = checkAuth(context);
            const post = await Post.findById(postId);
            if (post) {
                if (post.likes.find(e => e.username === username)) {
                    post.likes = post.likes.filter(e => e.username !== username);
                } else {
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    });
                }
                await post.save();
                return post;
            }
            throw new UserInputError('Post not found');
        }
    }
}