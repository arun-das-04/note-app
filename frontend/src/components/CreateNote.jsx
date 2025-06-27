import '../stylesheets/CreateNote.css';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import createNoteHook from '../hooks/createNoteHook';
import toast from 'react-hot-toast';


const CreateNote = () => {

  const navigate = useNavigate();
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
          navigate(-1);
        }
    }
    else{
      if(!userid) { toast.error("Failed to get User, plese Login again") }
      else if(!title || !content) { toast.error("Can't save empty data") }
    }

  }



  return (
    <div className='create-main'>
      <button id='create-back-btn' onClick={() => navigate(-1)}>back</button>

      <div className='create-note-main'>
        <input 
          placeholder='Enter a Title'
          maxLength={70}
          id='create-input-title'
          onChange={(e) => {setTitle(e.target.value)}}
          >
        </input>

        <textarea
          placeholder='Enter Your Note'
          id='create-input-content'
          onChange={(e) => {setContent(e.target.value)}}
          ref={textareaRef}
        >
        </textarea>

        <button id='create-save-btn' onClick={saveBtnHandler}>Save</button>

      </div>
    </div>
  )
}

export default CreateNote