import '../stylesheets/Note.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { setNote } from '../store/slices/noteSlice.js';

const Note = (props) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const note = props.note;

  // If user click on a particular note
  const handleNoteClick = () => {

    dispatch(setNote({
      noteid: note._id,
      noteTitle: note.title,
      noteContent: note.content,
      noteTime: note.updatedAt,
      isNoteOpened: true,
    }));

    navigate('/viewnote');
  }


  return (
    <div className='note-container' onClick={handleNoteClick}>
      <h4 className='note-title'>{note.title}</h4>
      <p className='note-content'>{note.content}</p>
    </div>
  )
}

export default Note