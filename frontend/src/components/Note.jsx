import React from 'react'
import '../stylesheets/Note.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { setNote } from '../store/slices/noteSlice';

const Note = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const note = props.note;


  const handleNoteClick = () => {
    navigate('/viewnote');

    dispatch(setNote({
      noteid: note._id,
      noteTitle: note.title,
      noteContent: note.content,
      noteTime: note.updatedAt,
      isNoteOpened: true,
    }));


  }


  return (
    <div className='note-container' onClick={handleNoteClick}>
      <h4 className='note-title'>{note.title}</h4>
      <p className='note-content'>{note.content}</p>
    </div>
  )
}

export default Note