import '../stylesheets/CreateNote.css';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNote } from '../store/slices/noteSlice';

import createNoteHook from '../hooks/createNoteHook';
import toast from 'react-hot-toast';

import { IoIosArrowBack } from "react-icons/io";
import { FaSave } from "react-icons/fa";



const CreateNote = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const createNote = createNoteHook();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const userid = useSelector( store => store.user.userid);

  const textareaRef = useRef(null);

  // auto resize content according to lines
  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height to shrink if needed
      const newHeight = Math.min(Math.max(textarea.scrollHeight, 100), 800);
      textarea.style.height = `${newHeight}px`; 
    }
  };

  // runs resize methods on content change
  useEffect(() => {
    resizeTextarea();
  }, [content]);


  // Save button function
  const saveBtnHandler = async () => {

    if(userid && title!='' || content!='') {
        const data = await createNote(title, content, userid);
        if(data.ok){
          dispatch(setNote({
            noteid: data.userNote._id,
            noteTitle: data.userNote.title,
            noteContent: data.userNote.content,
            noteTime: data.userNote.updatedAt,
            isNoteOpened: true,
          }));

          setTimeout(() => {
            navigate('/viewnote');
          }, 300)
          
        }
    }
    else{
      if(!userid) { toast.error("Failed to get User, plese Login again") }
      else if(!title || !content) { toast.error("Can't save empty data") }
    }

  }



  return (
    <div className='create-main'>
      <div className="create-top-btns">
        <button id='create-back-btn' onClick={() => navigate(-1)}><IoIosArrowBack/></button>
        <button id='create-save-btn' onClick={saveBtnHandler}><FaSave/></button>
      </div>

      <div className='create-note-main'>
        <input 
          placeholder='Add a title'
          maxLength={70}
          id='create-input-title'
          onChange={(e) => {setTitle(e.target.value)}}
          >
        </input>

        <textarea
          placeholder='Add Your Note'
          id='create-input-content'
          onChange={(e) => {setContent(e.target.value)}}
          ref={textareaRef}
        >
        </textarea>


      </div>
    </div>
  )
}

export default CreateNote