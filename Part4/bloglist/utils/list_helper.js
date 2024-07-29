const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return(
        blogs.reduce(
            (accumulator, currentValue) => accumulator + currentValue.likes,
            0
        )
    )
}

const favoriteBlog = (blogs) => {
    return(
        blogs.reduce(
            (previous, current) => {
                return (
                    (previous && previous.likes > current.likes) ? 
                    {
                        title: previous.title,
                        author: previous.author,
                        likes: previous.likes
                    }
                    :
                    {
                        title: current.title,
                        author: current.author,
                        likes: current.likes
                    }
                )
            },
            {}
        )
    )
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}