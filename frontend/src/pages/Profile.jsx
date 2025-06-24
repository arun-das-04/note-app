import React from 'react';
import Note from '../components/Note';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../stylesheets/Profile.css';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Profile = () => {
  const [notes, setNotes] = useState([]);
  const userid = useSelector(store => store.user.userid);
  const userName = useSelector(store => store.user.userName);
  const islogged = useSelector(store => store.user.islogged);

  useEffect(() => {

    fetch(`${import.meta.env.VITE_API_URL}/getnote`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid: userid
      }),
    })
    .then(response => response.json())
    .then((data) => {

      if(data.code==200){

        // console.log(data);
        setNotes(data.notes);
      }

      else{
        // console.log(`Something went wrong`, data);
        toast.err(data.message)
      }


    })
    .catch((err) => {
      // console.log(err);
      toast.err(err.message);
    });

  }, []);
    

  if(!islogged){
    return (
      <>
       <p>Please login first</p>
      </>
    )
  }

  else if(notes.length<1){
    
    return (
      <>
        <div className='profile-main'>
          <div className='profile-top-container'>
            <h2 className='profile-heading'>Welcome <span>{userName || 'loading..'}</span></h2>
            <Link to='/create'><button id='profile-create-note'>+</button></Link>
          </div>
        <p>No Notes are crated</p> 
        </div>
    </>
    )
  }
  else{
    
    return (
      <div className='profile-main'>
        <div className='profile-top-container'>
          <h2 className='profile-heading'>Welcome <span>{userName || 'loading..'}</span></h2>
          <Link to='/create'><button id='profile-create-note'>+</button></Link>
        </div>


        <div className='profile-note-section'>
          {notes.map((note, index) => (
            <Note key={index} title={note.title} content={note.content} />
          ))}
        </div>
        
      </div>
    )
  }


}

export default Profile