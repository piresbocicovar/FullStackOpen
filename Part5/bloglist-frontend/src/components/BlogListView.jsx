import React, { useRef } from 'react'
import BlogList from './BlogList'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import './BlogListView.css'

const BlogListView = ({ blogs, user }) => {
  const blogFormRef = useRef()

  return (
    <div className="blog-list-view">
      <div className="header-container">
        <h1 className="header-title">Blogs</h1>
        <Togglable buttonLabel={'New Blog'} ref={blogFormRef} className="new-blog-button">
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
      </div>
      <div className="blog-list-container">
        {blogs.map(blog => (
          <BlogList
            key={blog.id}
            blog={blog}
            username={user.username}
          />
        ))}
      </div>
    </div>
  )
}

export default BlogListView