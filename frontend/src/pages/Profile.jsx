import React from 'react';
import Note from '../components/Note';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

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

        console.log(data);
        setNotes(data.notes);
      }

      else{
        console.log(`Something went wrong`, data);
      }


    })
    .catch((err) => {
      console.log(err);
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
        <h2>Welcome {userName || 'loading..'}</h2>
        <p>No Notes are crated</p> 
    </>
    )
  }
  else{
    
    return (
      <div>
        <h2>Welcome {userName || 'loading..'}</h2>

        {notes.map((note, index) => (
          <Note key={index} title={note.title} content={note.content} />
        ))}
        
      </div>
    )
  }


}

export default Profile