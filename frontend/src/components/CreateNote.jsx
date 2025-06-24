import { useNavigate } from 'react-router-dom';
import '../stylesheets/CreateNote.css';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const CreateNote = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const userid = useSelector( store => store.user.userid);
  const textareaRef = useRef(null);


    const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height to shrink if needed
      const newHeight = Math.min(Math.max(textarea.scrollHeight, 100), 800);
      textarea.style.height = `${newHeight}px`;

      
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, [content]);


  const saveBtnHandler = () => {
    // console.log(title);
    // console.log(content);
    // console.log(userid);

    if(title!='' && content!=''){
    fetch(`${import.meta.env.VITE_API_URL}/createnote`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content,
            userid: userid,
        }),
    })
    .then(response => response.json())
    .then ((data) => {

      if(data.code==200){
        // console.log(data);
        toast.success(data.message)
        navigate(-1);
      }
      else{
         toast.err(data.message)
      }
        
    })
    .catch((err) => {
      // console.log(err);
      toast.err(err.message);
    });

  } else{
    // console.log('Please Enter Data to Proceed');
    toast('Please Enter Data to Proceed', {
      icon: '⚠️',
    });
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