const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    const favorite = blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max), blogs[0])

    return {
        author: favorite.author,
        title: favorite.title,
        likes: favorite.likes
    }
}

const mostBlogs = (blogs) => {
    const authors = _.groupBy(blogs, 'author');

    const authorBlogs = _.map(authors, (blogs, author) => ({
        author,
        blogs: blogs.length
    }));

    const result = _.maxBy(authorBlogs, 'blogs');
    return result || {};
};


const mostLikes = (blogs) => {
    const authors = _.groupBy(blogs, 'author')

    const authorLikes = _.map(authors, (blogs, author) => ({
        author,
        likes: _.sumBy(blogs, 'likes')
    }))

    const result = _.maxBy(authorLikes, 'likes')
    return result || {}
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}