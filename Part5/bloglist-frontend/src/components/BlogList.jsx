import { Link } from 'react-router-dom'
import './BlogList.css'

const BlogList = ({ blog }) => {
  return (
    <div className="blog">
      <h2 className="blog-title">
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </h2>
    </div>
  )
}

export default BlogList