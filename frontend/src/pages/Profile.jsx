import '../stylesheets/Profile.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Note from '../components/Note';
import getNoteHook from '../hooks/getNoteHook';
import { useNavigate } from 'react-router-dom';


const Profile = () => {

  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [searchNote, setSearchNote] = useState('');

  const getNotes = getNoteHook();

  // Store items
  const userName = useSelector(store => store.user.userName);
  const userid = useSelector(store => store.user.userid);
  const islogged = useSelector(store => store.user.islogged);

  const handleCreateBtn = () => {
    navigate('/viewnote', {
      state : {for: 'create'}
    });
  }
  
  // Filter note based on search - for empty search all notes will be shown
  const filterNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchNote.toLowerCase()));

  // By default fetch all Notes
  useEffect(() => {
      const fetchAllNote = async () => {
        if(userid && islogged){
          const data = await getNotes(userid);
          setNotes(data.notes);
        }
      }
      fetchAllNote();
  }, [userid]);

    

  // if user is not logged
  if( !islogged ){
    return (
      <>
      <div className='profile-main'>
        <p>Please login first</p>
      </div>
      </>
    )
  }

  // if user is logged
  return (
      <div className='profile-main'>
        <div className='profile-top-container'>
          <h2 className='profile-heading'>Welcome <span>{userName || 'loading..'}</span></h2>
          <button id='profile-create-note' onClick={handleCreateBtn}>+</button>
        </div>

        <input placeholder='Search Notes...' id='profile-search-note' onChange={(e) => setSearchNote(e.target.value)}></input>

        <div className='profile-note-section'>
          {filterNotes?.length<1?
            <p>No Notes are created</p> 
            :
            filterNotes?.map((note, index) => (
              <Note 
                key={index} 
                note={note} 
              />
            ))
          }
        </div>
        
      </div>
    );

}

export default Profile