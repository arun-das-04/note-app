import React from 'react';
import '../stylesheets/NoteView.css';
import { IoIosArrowBack } from "react-icons/io";
import { FaSave } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { setNote } from '../store/slices/noteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { exitNote } from '../store/slices/noteSlice';
import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';

const NoteView = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const noteid = useSelector(state => state.note.noteid);
  const noteTitle = useSelector(state => state.note.noteTitle);
  const noteContent = useSelector(state => state.note.noteContent);
  const noteTime = useSelector(state => state.note.noteTime);
  const isNoteOpened = useSelector(state => state.note.isNoteOpened);

  const [newTitle, setNewTitle] = useState(noteTitle);
  const [newContent, setNewContent] = useState(noteContent);
  const [isedit, setisedit] = useState(false);

  const editTitle = useRef(null);
  const editContent = useRef(null);
  const editBtn = useRef(null);
  const editTextArea = useRef(null);


  const fullTime = new Date(noteTime);

  const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  const year = fullTime.getFullYear();
  const month = fullTime.getMonth();
  const date = fullTime.getDate();

  const handleBackBtn = () => {
    navigate(-1);
    dispatch(exitNote());

  }

  const handleEditBtn = () => {
    if(!isedit){
      setisedit(true);
      setNewTitle(noteTitle);
      setNewContent(noteContent);
    }

    else{
      fetch(`${import.meta.env.VITE_API_URL}/editnote`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          noteid: noteid,
          newTitle: newTitle, 
          newContent: newContent
        }),
      })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        if(data.code == 200){
          toast.success(data.message);
          setisedit(false);

          dispatch(setNote({
            noteid: noteid,
            noteTitle: newTitle,
            noteContent: newContent,
            noteTime: noteTime,
            isNoteOpened: true,
          }));

        }
        else{
          toast.error('Something Went Wrong');
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });

      
    }

  }

  const resizeTextarea = () => {
      const textarea = editTextArea.current;
      if (textarea) {
        textarea.style.height = 'auto'; // Reset height to shrink if needed
        const newHeight = Math.min(Math.max(textarea.scrollHeight, 100), 800);
        textarea.style.height = `${newHeight}px`;
      }
    };
  
    useEffect(() => {
      resizeTextarea();
    }, [newContent]);


  if(isNoteOpened){
    return (

      <div className='viewnote-main'>
        <div className='viewnote-top-buttons'>
          <button id='viewnote-back-btn' onClick={handleBackBtn}><IoIosArrowBack/></button>
          <button 
            id='viewnote-edit-btn' 
            ref={editBtn} onClick={handleEditBtn}>
              {!isedit? <FiEdit /> : <FaSave/> }
          </button>
        </div>

        
        <div className='viewnote-data'>
          <p id='viewnote-time'>{date} {months[month]},  {year}</p>
          {!isedit?
            <p
            ref={editTitle}
            id='viewnote-title'>
              {noteTitle}
            </p>
            :
            <input 
              id='viewnote-title' 
              defaultValue={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              >
              
            </input>
          }
          

          {!isedit?
            <p 
            ref={editContent}
            id='viewnote-content'>
                {noteContent}
          </p>
          :
          <textarea 
            id='viewnote-content' 
            defaultValue={newContent}
            ref={editTextArea}
            onChange={(e) => setNewContent(e.target.value)}
            />
          }
          
        </div>

      </div>
    );
  }

  else{
    return(
      <p>No notes is selected</p>
    );
  }
}

export default NoteView