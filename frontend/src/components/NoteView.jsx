import '../stylesheets/NoteView.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setNote, exitNote } from '../store/slices/noteSlice.js';

import createNoteHook from '../hooks/createNoteHook.jsx';
import editNoteHook from '../hooks/editNoteHook';
import deleteNoteHook from '../hooks/deleteNoteHook';

import { IoIosArrowBack } from "react-icons/io";
import { FaSave } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

import toast from 'react-hot-toast';


const NoteView = () => {

  // Objects
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Note Store Items - This items used for getting the selected note data 
  const noteid = useSelector(state => state.note.noteid);
  const noteTitle = useSelector(state => state.note.noteTitle);
  const noteContent = useSelector(state => state.note.noteContent);
  const noteTime = useSelector(state => state.note.noteTime);
  const isNoteOpened = useSelector(state => state.note.isNoteOpened);

  // User Store item - This item used for getting logged user id for saving or creating notes
  const userid = useSelector(state => state.user.userid);

  // useState Variables
  const [newTitle, setNewTitle] = useState(noteTitle);
  const [newContent, setNewContent] = useState(noteContent);
  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  // Refs
  const editContent = useRef(null);

  // Hook functions - This functions used for api taskes mentioned in the hook
  const createNote = createNoteHook();
  const editNote = editNoteHook();
  const deleteNote = deleteNoteHook();


  // Date methods - To exact Date properties from 'noteTime' which is a database date object
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const fullTime = new Date(noteTime);
  const year = fullTime.getFullYear();
  const month = fullTime.getMonth();
  const date = fullTime.getDate();


  // If user came to create note => Then it will active the Create and Edit Mode
  useEffect(() => {
    if(location.state?.for === 'create') {
      setIsCreate(true);
      setIsEdit(true);
  
      dispatch(setNote({    // Adding a empty note to Store 
        noteid: null, noteTitle: "", noteContent: "", noteTime: null, isNoteOpened: true,
      }));
    }
  }, []);



  // On Back Button Click
  const handleBackBtn = () => {
    dispatch(exitNote());  // Removing note from Store
    navigate('/notes'); 
  };



  // On Edit / Save button Click
  const handleActionBtn = async () => {

    // If View mode => Then move to edit mode
    if(!isEdit){
      setIsEdit(true);
      setNewTitle(noteTitle);
      setNewContent(noteContent);
      editContent.current.focus();
    }

    // If Edit mode => Then Save data and back to view mode
    else{
      if(newTitle || newContent){   // It required at least one data

          /* If Create Note mode is active =>
              - Create and save it
              - Move to non Create and View mode
              - Store the new Created Note in Note Store
          */
          if(isCreate) {
            const data = await createNote(newTitle, newContent, userid);
            if(data.ok){
              setIsCreate(false);
              setIsEdit(false);
              dispatch(setNote({
                noteid: data.userNote._id,
                noteTitle: data.userNote.title,
                noteContent: data.userNote.content,
                noteTime: data.userNote.updatedAt,
                isNoteOpened: true,
              }));
            }
          }

          /* If Edit Note mode is active
              - Update current note with Edited note
              - set the new Note to the Note Store
          */
          else{
            if(noteid){
              const data = await editNote(noteid, newTitle, newContent);
              if(data.ok){
                dispatch(setNote({
                    noteid: noteid,
                    noteTitle: newTitle,
                    noteContent: newContent,
                    noteTime: data.userNote?.updatedAt,
                    isNoteOpened: true,
                  }));
              }
            }
          }

      // if no data is provided
      } 
      else { toast.error("Empty note can't be saved"); }
    }
  };


  // On Delete button Click => It deletes the note and back
  const handleDeleteBtn = async () => {
    if(noteid, userid) {
      const data = await deleteNote(noteid, userid);

      if(data.ok) {
        setTimeout(() => {
          dispatch(exitNote());
          navigate('/notes');
        }, 400);
      }
    }
    else {
      toast.error('Some Problem Occured');
    }
  };


  // Resize content height based on lines in content
  const resizeTextarea = () => {
    const textarea = editContent.current;
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


  // Settting the cursor at the end of the content text in edit mode
  useEffect(() => {
    if(isEdit && editContent.current) {
      const item = editContent.current;
      item.focus();
      const length = item.value.length;
      item.setSelectionRange(length, length);
    }
  }, [isEdit]);


  // If a note is selected
  if(isNoteOpened){
    return (
      <div className='viewnote-main'>
        <div className='viewnote-top-buttons'>
          <button id='viewnote-back-btn' onClick={handleBackBtn}><IoIosArrowBack/></button>

          <div className='viewnote-right-buttons'>
            <button 
              id='viewnote-edit-btn' 
              onClick={handleActionBtn}
              >
                {!isEdit? <FiEdit /> : <FaSave/> }
            </button>

            {/* Show delete button only for View Mode (hidden in create mode) */}
            {!isCreate?
             <button id='viewnote-delete-btn' onClick={handleDeleteBtn}>Delete</button> 
             : 
             <></>}
          </div>
        </div>

        
        <div className='viewnote-data'>
          
          {/* Show time only for View and edit mode (Hidden for Create mode) */}
          {!isCreate? <p id='viewnote-time'>{date} {months[month]},  {year}</p> : <></> }

          { !isEdit?
            // Title for View Mode
            <p
              id='viewnote-title'>
              {noteTitle}
            </p>

            :

            // Title for Edit Mode
            <input 
              id='viewnote-title' 
              placeholder = 'Add Title'
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          }
          
          { !isEdit?
            // Content for View Mode
            <p 
              id='viewnote-content'>
                  {noteContent}
            </p>

            :

            // Content for Edit Mode
            <textarea 
              id='viewnote-content' 
              placeholder = 'Add Your Note'
              value={newContent}
              ref={editContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
          }
          
        </div>
      </div>
    );
  };

  // If no note is selected
  return(
    <p>No notes is selected</p>
  );
};

export default NoteView;