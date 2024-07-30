const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogList = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }  
]

test('dummy function returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('favorite blog', () => {
    test('returns an empty object for an empty list', () => {
        const result = listHelper.favoriteBlog([])
        assert.deepStrictEqual(result, {})
    })

    test('returns the only blog for a list with one blog', () => {
        const result = listHelper.favoriteBlog([blogList[1]])
        assert.deepStrictEqual(result, {
            author: blogList[1].author,
            likes: blogList[1].likes,
            title: blogList[1].title
        })
    })

    test('returns the most liked blog for a bigger list', () => {
        const result = listHelper.favoriteBlog(blogList)
        assert.deepStrictEqual(result, {
            author: blogList[2].author,
            likes: blogList[2].likes,
            title: blogList[2].title
        })
    })
})

describe('most blogs', () => {
    test('returns an empty object for an empty list', () => {
        const result = listHelper.mostBlogs([])
        assert.deepStrictEqual(result, {})
    })

    test('returns the author of the only blog for a list with one blog', () => {
        const result = listHelper.mostBlogs([blogList[1]])
        assert.deepStrictEqual(result, {
            author: "Edsger W. Dijkstra",
            blogs: 1
        })
    })

    test('returns the author with the most blogs for a bigger list', () => {
        const result = listHelper.mostBlogs(blogList)
        assert.deepStrictEqual(result, {
            author: "Robert C. Martin",
            blogs: 3
        })
    })
})

describe('total likes', () => {
    test('returns 0 for an empty list', () => {
        const result = listHelper.totalLikes([])
        assert.strictEqual(result, 0)
    })

    test('equals the likes of the only blog for a list with one blog', () => {
        const result = listHelper.totalLikes([blogList[1]])
        assert.strictEqual(result, 5)
    })

    test('calculates the total likes correctly for a bigger list', () => {
        const result = listHelper.totalLikes(blogList)
        assert.strictEqual(result, 36)
    })
})

describe('most likes', () => {
    test('returns an empty object for an empty list', () => {
        const result = listHelper.mostLikes([])
        assert.deepStrictEqual(result, {})
    })

    test('returns the author of the only blog for a list with one blog', () => {
        const result = listHelper.mostLikes([blogList[1]])
        assert.deepStrictEqual(result, {
            author: "Edsger W. Dijkstra",
            likes: 5
        })
    })

    test('returns the author of the most liked blogs for a bigger list', () => {
        const result = listHelper.mostLikes(blogList)
        assert.deepStrictEqual(result, {
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})
