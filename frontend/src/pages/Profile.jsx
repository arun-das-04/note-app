import '../stylesheets/Profile.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Note from '../components/Note';
import getNoteHook from '../hooks/getNoteHook';


const Profile = () => {

  const [notes, setNotes] = useState([]);

  const getNotes = getNoteHook();

  // Store items
  const userName = useSelector(store => store.user.userName);
  const userid = useSelector(store => store.user.userid);
  const islogged = useSelector(store => store.user.islogged);

  
  // By default fetch all Notes
  useEffect(() => {
    try{
      const fetchAllNote = async () => {
        if(userid && islogged){
          const {res, data} = await getNotes(userid);
          setNotes(data.notes);
        }
      }
      fetchAllNote();
    } catch (_) { }

  }, []);
    

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
          <Link to='/create'><button id='profile-create-note'>+</button></Link>
        </div>

        <div className='profile-note-section'>
          {notes.length<1?
            <p>No Notes are crated</p> 
            :
            notes.map((note, index) => (
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