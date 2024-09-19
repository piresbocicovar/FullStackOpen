import React, { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import './Togglable.css'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }))

  return (
    <div className="togglable-container">
      <div style={hideWhenVisible}>
        <Button className="togglable-button" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible} className="togglable-content">
        {props.children}
        <Button className="cancel-button" onClick={toggleVisibility}>
          Cancel
        </Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
