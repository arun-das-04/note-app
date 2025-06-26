import { Router } from 'express';
import User from '../database/models/userModel.js';
import Note from '../database/models/noteModel.js';
import route2 from './routeSecond.js';
import route3 from './routeThird.js';
import route4 from './routeForth.js';


const route = Router();

// Default path
route.get('/', (req, res) => {
  res.send('Welcome to my server for Note App');
});


// Adding a New User / Signup
route.post('/adduser', async (req, res) => {
  try{
    const {email, password, name} = req.body;
    if(email!='' && password!='' && name!=''){
      const newUser = new User({email, password, name});
      await newUser.save();
      res.send({code: 200, message: 'User is added', userData: newUser});
    }
    else{
      res.send({code: 400, message: 'Data is invalid'});
    }

  } catch(err){
    res.send({code: 500, message: 'Internal Server Error', errMessage: err.message});
  }
});


// Login / Auth
route.post('/userlogin', async (req, res) => {
  try{
    const {email, password} = req.body;
    const findEmail = await User.findOne({email: email});

    if(findEmail) {
      const findUser = await User.findOne({email: email, password: password});
      if(findUser) {
        res.send({code: 200, message: 'User Authentication passed'});
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
    res.send({code: 500, message: 'Internal Server Error', errMessage: err.message});
  }
});



// Adding a new Note
route.post('/createnote', async (req, res) => {
  try{
    const {title, content, userid} = req.body;

    if(userid){
      const newNote = new Note({title, content, userid});
      await newNote.save();
      res.send({code: 200, message: 'Note successfully added', userNote: newNote});
    }
    else{
      res.send({code: 400, message: 'Data is invalid'});
    }
  }
  catch (err) {
    res.send({code: 500, message: 'Internal Server Error', errMessage: err.message});
    // console.log(err.message);
  }
  
});


 // Getting notes for specific user
 route.post('/getnote', async (req, res) => {
  try{
    const {userid} = req.body;

    if(userid){
      const notes = await Note.find({userid: userid})
      res.send({code: 200, message: 'Note Retrived', notes: notes});
    }
    else{
      res.send({code: 400, message: 'Data is invalid'});
    }

  }
  catch(err){
    res.send({code: 500, message: 'Internal Server Error', errMessage: err.message});

  } 
 });


 // Other Routes
 route.use('/', route2);
 route.use('/', route3);
 route.use('/', route4);


 // Future Implementation ideas

 
 // Toest Implement
 // Update Email
 // Update Password
 // Email OTP varification
 // Note Structure update for frotnend view
 // Note view
 // Edit Note
 // Delete Note

 // JWT implement 
 // Cookies token implement

 // Add Password for Note
 




export default route;