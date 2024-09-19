import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createComment, initializeComments } from '../reducers/commentsReducer'
import { notify } from '../reducers/notificationReducer'
import Comment from './Comment'
import Togglable from './Togglable'
import { Button, Form } from 'react-bootstrap'
import './Comments.css'

const Comments = ({ blogId }) => {
  const dispatch = useDispatch()
  const comments = useSelector(state => state.comments)
  const [newComment, setNewComment] = useState('')
  const togglableRef = useRef()

  useEffect(() => {
    dispatch(initializeComments(blogId))
  }, [dispatch, blogId])

  const handleCommentChange = (event) => {
    setNewComment(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (newComment.trim() !== '') {
      try {
        await dispatch(createComment(blogId, newComment))
        setNewComment('')
        dispatch(notify('Successfully added a new comment', 'success'))
        if (togglableRef.current) {
          togglableRef.current.toggleVisibility()
        }
      } catch (exception) {
        dispatch(notify(`${exception}`, 'error'))
      }
    }
  }

  return (
    <div className="comments-container">
      <h2 className="comments-header">Comments</h2>
      <Togglable buttonLabel="Add Comment" ref={togglableRef}>
        <Form onSubmit={handleSubmit} className='blog-form'>
          <div className='form-group'>
            <Form.Label className='visually-hidden'>Comment:</Form.Label>
            <Form.Control className='comments-form-control'
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Write your comment here..."
            />
          </div>
          <div className='form-buttons'>
            <Button variant='primary' type='submit'>
              Add Comment
            </Button>
          </div>
        </Form>
      </Togglable>
      <div className="comments-list-container">
        {comments.length > 0 ? (
          <ul className='comments-list'>
            {comments.map(comment => (
              <li key={comment.id} className="comment-item">
                <Comment comment={comment} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  )
}

export default Comments