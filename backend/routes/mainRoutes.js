import { Router } from 'express';
import mongoose from 'mongoose';
import User from '../database/models/userModel.js';
import Note from '../database/models/noteModel.js';

const route = Router();

// Default path
route.get('/', (req, res) => {
  res.send('Welcome to my server');
});


// Adding a New User
route.post('/adduser', async (req, res) => {
  try{
    const {email, password, name} = req.body;
    const newUser = new User({email, password, name});
    await newUser.save();

    res.send({code: 200, message: 'User is added', userData: newUser});


  } catch(err){
    res.send({code: 400, message: 'User is failed to add', errMessage: err.message});
    // console.log(err.message);
  }
});


// Login
route.post('/userlogin', async (req, res) => {
  try{
    const {email, password} = req.body;

    const findEmail = await User.findOne({email: email});

    if(findEmail){
      const findUser = await User.findOne({email: email, password: password});

      if(findUser){
        res.send({code: 200, message: 'User Authentication passed', userData: findUser});
      }
      else{
        res.send({code: 404, message: 'Wrong Password'});
      }
    }
    else{
      res.send({code: 404, message: 'Email does not found'});
    }

  }
  catch (err){
    res.send({code: 400, message: 'Login failed due to server error', errMessage: err.message});
  }
})




// Adding a new Note
route.post('/createnote', async (req, res) => {
  try{
  const {title, content, userid} = req.body;
  const newNote = new Note({title, content, userid});
  await newNote.save();

  res.send({code: 200, message: 'Note added', userNote: newNote});

  }
  catch (err) {
    res.send({code: 400, message: 'Failed to Add note', errMessage: err.message});
    // console.log(err.message);
  }
  
});


 // Getting notes for specific user
 route.post('/getnote', async (req, res) => {
  try{
    const {userid} = req.body;
    const notes = await Note.find({userid: userid})
    res.send({code: 200, message: 'Note Retrived', notes: notes});

  }
  catch(err){
    res.send({code: 400, message: 'Note is failed to retrive due to server error', errMessage: err.message});

  } 
 })



export default route;