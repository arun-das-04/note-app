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

    if(!email || !password || !name){
      return res.status(400).json({ ok: false, message: 'All fields are required'})
    }

    const findEmail = await User.findOne({ email });
    if(findEmail) {
      return res.status(409).json({ ok: false, message: 'Email already exists'})
    }

    const newUser = new User({email, password, name});
    await newUser.save();

    const { _id } = newUser;
    res.status(200).json({ 
      ok: true,
      message: 'Account created successfully', 
      userData: {_id, name, email} 
    });

  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'Internal Server Error', 
      errMessage: err.message
    });
  }
});


// Login / Auth
route.post('/userlogin', async (req, res) => {
  try{
    const { email, password } = req.body;

    if(!email || !password) {
      return res.status(400).json({ ok: false, message: 'Email and Password are required'});
    }

    const user = await User.findOne({ email });

    if(!user) {
      return res.status(404).json({ok: false, message: 'Email not found'});
    }

    if(user.password !== password) {
      return res.status(401).json({ ok: false, message: 'Wrong Password'});
    }

    const {_id, name } = user;
    res.status(200).json({
      ok: true,
      message: 'Login Successful',
      userData: { _id, name, email }
    });
     
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'Internal Server Error',
      errMessage: err.message
    });
  }
});



// Adding a new Note
route.post('/createnote', async (req, res) => {
  try{
    const {title, content, userid} = req.body;

    if(!userid) {
      return res.status(400).json({ ok: false, message: 'User ID required to create note'});
    }

    const newNote = new Note({title, content, userid});
    await newNote.save();

    const { _id, createdAt } = newNote;
    res.status(200).json({
      ok: true,
      message: 'Note successfully added', 
      userNote: {_id, title, content, createdAt}
    });

  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'Internal Server Error', 
      errMessage: err.message
    });
  }
});


 // Getting notes for specific user
 route.post('/getnote', async (req, res) => {
  try{
    const {userid} = req.body;

    if(!userid) {
      return res.status(404).json({ ok: false, message: 'User ID is required'});
    }

    const notes = await Note.find({userid: userid});

    res.status(200).json({
      ok: true,
      message: 'All notes are fetched',
      notes: notes
    });

  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'Internal Server Error', 
      errMessage: err.message
    });
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