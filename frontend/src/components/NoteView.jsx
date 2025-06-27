import '../stylesheets/NoteView.css';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setNote, exitNote } from '../store/slices/noteSlice.js';
import editNoteHook from '../hooks/editNoteHook';

import { IoIosArrowBack } from "react-icons/io";
import { FaSave } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";



const NoteView = () => {

  // Objects
  const navigate = useNavigate();
  const dispatch = useDispatch();


  // Note Store items
  const noteid = useSelector(state => state.note.noteid);
  const noteTitle = useSelector(state => state.note.noteTitle);
  const noteContent = useSelector(state => state.note.noteContent);
  const noteTime = useSelector(state => state.note.noteTime);
  const isNoteOpened = useSelector(state => state.note.isNoteOpened);

  // States
  const [newTitle, setNewTitle] = useState(noteTitle);
  const [newContent, setNewContent] = useState(noteContent);
  const [isedit, setisedit] = useState(false);

  // Refs
  const editTitle = useRef(null);
  const editContent = useRef(null);
  const editBtn = useRef(null);
  const editTextArea = useRef(null);

  // Hook functions
  const editNote = editNoteHook();


  // Date methods
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const fullTime = new Date(noteTime);
  const year = fullTime.getFullYear();
  const month = fullTime.getMonth();
  const date = fullTime.getDate();

  // Back Button Click
  const handleBackBtn = () => {
    dispatch(exitNote());
    navigate('/profile');
  }

  // Edit button Click
  const handleEditBtn = async () => {

    // setting to edit mode from view mode
    if(!isedit){
      setisedit(true);
      setNewTitle(noteTitle);
      setNewContent(noteContent);
    }

    // saving edited note and back to view mode
    else{
      try{
        await editNote(noteid, newTitle, newContent);
        const presentTime = Date.now();
        dispatch(setNote({
            noteid: noteid,
            noteTitle: newTitle,
            noteContent: newContent,
            noteTime: presentTime,
            isNoteOpened: true,
          }));
      } catch (_) { }
  }
}

// Resize area based on lines in content
const resizeTextarea = () => {
  const textarea = editTextArea.current;
  if (textarea) {
    textarea.style.height = 'auto'; // Reset height to shrink if needed
    const newHeight = Math.min(Math.max(textarea.scrollHeight, 100), 800);
    textarea.style.height = `${newHeight}px`;
  }
};
  

// run resize method on content change
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

          { !isedit?
            // Title for View Mode
            <p
              ref={editTitle}
              id='viewnote-title'>
              {noteTitle}
            </p>

            :

            // Title for Edit Mode
            <input 
              id='viewnote-title' 
              placeholder = 'Add Title'
              defaultValue={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          }
          
          { !isedit?
            // Content for View Mode
            <p 
              ref={editContent}
              id='viewnote-content'>
                  {noteContent}
            </p>

            :

            // Content for Edit Mode
            <textarea 
              id='viewnote-content' 
              placeholder = 'Add Your Note'
              defaultValue={newContent}
              ref={editTextArea}
              onChange={(e) => setNewContent(e.target.value)}
            />
          }
          
        </div>
      </div>
    );
  }

  // If no note is selected
  return(
    <p>No notes is selected</p>
  );
}

export default NoteView;