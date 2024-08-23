import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, username }) => {

  const [showInfo, setShowInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (showInfo) {
    return(
      <div style={blogStyle}>
        Blog: {blog.title} <button onClick={() => setShowInfo(false)}>Hide</button><br/>
        Author: {blog.author}<br/>
        Likes:{blog.likes}<br/>
        URL: {blog.url}<br/>
        Posted by: {blog.user ? blog.user.name : ''} <button onClick={(event) => handleLike(event, blog)}>Like</button><br/>
        {blog.user && username === blog.user.username ?
          <button onClick={(event) => handleDelete(event, blog)}>Delete</button> :
          ''}
      </div>
    )
  } else {
    return(
      <div style={blogStyle}>
        Blog: {blog.title} by {blog.author} <button onClick={() => setShowInfo(true)}>View</button>
      </div>
    )
  }
}

export default Blog