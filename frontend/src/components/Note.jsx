import React from 'react'
import '../stylesheets/Note.css';

const Note = (props) => {
  return (
    <div className='note-container'>
      <h4 className='note-title'>{props.title}</h4>
      <p className='note-content'>{props.content}</p>
    </div>
  )
}

export default Note