import { useState } from 'react'
import './Blog.css'

const Blog = ({ blog, handleLike, handleDelete, username }) => {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div className="blog">
      {showInfo ? (
        <>
          <h2 className="blog-title">{blog.title}</h2>
          <button className="toggle-button" onClick={() => setShowInfo(false)}>Hide</button>
          <p><strong>Author:</strong> {blog.author}</p>
          <p><strong>Likes:</strong> {blog.likes}</p>
          <p><strong>URL:</strong> {blog.url}</p>
          <p><strong>Posted by:</strong> {blog.user ? blog.user.name : ''}</p>
          <button className="action-button" onClick={(event) => handleLike(event, blog)}>Like</button>
          {blog.user && username === blog.user.username && (
            <button className="action-button" onClick={(event) => handleDelete(event, blog)}>Delete</button>
          )}
        </>
      ) : (
        <>
          <h2 className="blog-title">{blog.title}</h2>
          <p>by {blog.author}</p>
          <button className="toggle-button" onClick={() => setShowInfo(true)}>View</button>
        </>
      )}
    </div>
  )
}

export default Blog
