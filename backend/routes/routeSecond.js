import { Router } from 'express';
import User from '../database/models/userModel.js';
import Note from '../database/models/noteModel.js';
import sendOTP from '../modules/nodeMailer.js';

const route = Router();


// Edit Email Feature
route.patch('/editemail', async (req, res) => {
  try{
    const {email, newEmail} = req.body;
    const updateEmail = await User.findOneAndUpdate({email: email}, {$set:{email: newEmail}});

    if(updateEmail){
      res.send({code: 200, message: 'Email Successfully Updated', result: {oldEmail: updateEmail.email, newEmail: newEmail, id: updateEmail._id}});
    }
    else{
      res.send({code: 404, message: 'Email Failed to Update'});
    }
  }
  catch(err){
    res.send({code: 500, message: 'Internal Server Error', errMessage: err.message});
  }
});


// Edit Note Feature
route.patch('/editnote', async (req, res) => {
  try{
    const {noteid, newTitle, newContent} = req.body;
    const updateNote = await Note.findOneAndUpdate({_id: noteid}, {$set:{title: newTitle, content: newContent}});

    if(updateNote){
      res.send({code: 200, message: 'Note is updated'});
    }
    else{
      res.send({code: 404, mesage: 'Note is failed to Update'});
    }

  }
  catch(err){
    res.send({code: 500, message: 'Internal Server Error', errMessage: err.message});
    
  }
});



// OTP varification
let OtpStore = {};

// Request/Send OTP
route.post('/requestotp', async (req, res) => {
  
  try{
    const {email} = req.body;

    if(email){
      const {OTP, info} = await sendOTP(email);

      if(OTP && info.messageId){
        OtpStore = {email: email, OTP: OTP}
        res.send({code: 200, message: 'OTP sent Successfully'});
      }
      else{
        res.send({code: 404, message: 'OTP Failed to Sent'})
      }
    }
    else{
      res.send({code: 400, message: 'Data is invalid'});
    }
    
  }
  catch(err){
    res.send({code: 500, message: 'Internal server error', errMessage: err.message});
  }
});

// Varify OTP
route.post('/varifyotp', (req, res) => {
  try{
    const {OTP, email} = req.body;

    if(OTP && email){
      if(OtpStore.email == email && OtpStore.OTP == OTP){
        res.send({code: 200, message: 'OTP Matched'});
      }
      else{
        res.send({code: 404, message: 'Invalid OTP'});
      }
   }
   else{
    res.send({code: 400, message: 'Data is invalid'});
   }
  }
  catch(err){
    res.send({code: 500, message: 'Internal Server Error', errMessage: err.message});
  }

});


// Search email availibility
route.post('/varifyemail', async (req, res) => {

  try{
    const {email} = req.body;
    const searchEmail = await User.findOne({email: email});
    if(!searchEmail){
      res.send({code: 200, message: 'Email is Available to use'});
    }
    else{
      res.send({code: 404, message: 'Email already in use'});
    }
  }
  catch(err){
    res.send({code: 500, message: 'Internal Server Error', errMessage: err.message});
  }

});



export default route;