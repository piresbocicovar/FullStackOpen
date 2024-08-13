import { useState } from 'react'

const BlogForm = () => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        if (newTitle === '') {
          alert('Field "Title" can\'t be empty')
        } else if (newAuthor === '') {
          alert('Field "Author" can\'t be empty')
        } else if (newUrl === '') {
          alert('Field "Url" can\'t be empty')
        } else {
            const BlogObject = {
              title: newTitle,
              author: newAuthor,
              url: newUrl
            }
            blogService.create(BlogObject)
                .then(returnedBlog => {
                    setBlogs(blogs.concat(returnedBlog))
                    setMessage({text:`'${returnedBlog.title}' was added to the blog list`, type: 'success'})
                    setTimeout(() => {
                        setMessage({text:'', type:''})
                    }, 3000)
                    setNewTitle('')
                    setNewAuthor('')
                    setNewUrl('')
                })
                .catch(error => {
                    setMessage({
                        text: `${error.response.data.error}`,
                        type: 'error'
                    })
                    setTimeout(() => {
                        setMessage({text:'', type:''})
                    }, 3000)
                })
          }
    }

    return(
        <>
            <h2>New Blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    title: <input value={newTitle} onChange={({ target }) => setNewTitle(target.value)}/>
                </div>
                <div>
                    author: <input value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)}/>
                </div>
                <div>
                    url: <input value={newUrl} onChange={({ target }) => setNewUrl(target.value)}/>
                </div>
                <div>
                    <button type='submit'>add</button>
                </div>
            </form>
        </>
    )
}

export default BlogForm