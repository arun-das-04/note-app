import { Router } from 'express';
import User from '../database/models/userModel.js';
import Note from '../database/models/noteModel.js';
import sendOTP from '../modules/nodeMailer.js';

const route = Router();


// Edit Email Feature
route.patch('/editemail', async (req, res) => {
  try{
    const { userid , newEmail } = req.body;

    if( !userid || !newEmail ) {
      return res.status(404).json({ok: false,  message: 'Data is missing'});
    }
    
    const updateEmail = await User.findOneAndUpdate({_id: userid}, {$set:{email: newEmail}});

    if( !updateEmail ) {
      return res.status(400).json({ ok: false, message: 'Email failed to update'});
    }

    res.status(200).json({
      ok: true,
      message: 'Email Successfully Updated', 
      result: { oldEmail: updateEmail.email, newEmail: newEmail, _id: userid }
    });

  } catch(err) {
    res.status(500).json({
      ok: false,
      message: 'Internal Server Error', 
      errMessage: err.message
    });
  }
});


// Edit Note Feature
route.patch('/editnote', async (req, res) => {
  try{
    const {noteid, newTitle, newContent} = req.body;

    if( !noteid ) {
      return res.status(404).json({ ok: false, message: 'Note ID is required' });
    }

    const updateNote = await Note.findOneAndUpdate({_id: noteid}, {$set:{title: newTitle, content: newContent}});

    if(!updateNote){
      return res.status(400).json({ ok: false, messsage: 'Note is failed to update' });
    }

    res.status(200).json({
      ok: true,
      message: 'Note is updated',
      noteid: noteid
    });

  } catch(err) {
    res.status(500).json({
      ok: false,
      message: 'Internal Server Error', 
      errMessage: err.message
    });
  }
});


// OTP varification
let OtpStore = {};

// Request/Send OTP
route.post('/requestotp', async (req, res) => {
  try{
    const {email} = req.body;

    if( !email ) {
      return res.status(404).json({ ok: false, message: 'Email is required to sent OTP'});
    }

    const {OTP, info} = await sendOTP( email );

    if( !OTP || !info.messageId ) {
      return res.status(400).json({ ok: false, message: 'Failed to Sent OTP'});
    }

    OtpStore[email] = OTP;

    res.status(200).json({
      ok: true,
      message: 'OTP sent Successfully',
      email: email
    });

  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'Internal server error', 
      errMessage: err.message
    });
  }
});

// Varify OTP
route.post('/varifyotp', (req, res) => {
  try{
    const {OTP, email} = req.body;

    if( !OTP || !email ) {
      return res.status(404).json({ ok: false, message: 'Data is missing' });
    }
    
    if( OtpStore[email] !== Number(OTP) ) {
      return res.status(400).json({ ok: false, message: 'Invalid OTP'});
    }

    res.status(200).json({
      ok: true, 
      message: 'OTP Matched',
      email: email
    });

  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'Internal Server Error', 
      errMessage: err.message
    });
  }
});


// Search email availibility
route.post('/checkemail', async (req, res) => {
  try{
    const {email} = req.body;

    if( !email ) {
      return res.status(404).json({ ok: false, message: 'Email is required'});
    }

    const searchEmail = await User.findOne({email: email});
    
    if(searchEmail){
      return res.status(400).json({ ok: false, message: 'Email already in use'});
    }

    res.status(200).json({
      ok: true,
      message: 'Email is Available to use',
      email: email
    });

  } catch(err) {
    res.status(500).json({
      ok: false,
      message: 'Internal Server Error', 
      errMessage: err.message
    });
  }
});


route.delete('/deletenote', async (req, res) => {

  try{
    const {noteid} = req.body;

    if(!noteid) {
      return res.status(404).json({ok: false, message: "noteid is required"});
    }
    const deleteNote = await Note.findByIdAndDelete(noteid);
    if(!deleteNote) {
      return res.status(400).json({ok: false, message: "Failed to delete note"});
    }

    res.status(200).json({
      ok: true,
      message: "Note is deleted successfully",
      noteid: noteid,
    });

  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Internal Server Error",
      errMessage: err.message,
    });
  }
});


route.patch('/changepassword', async (req, res) => {

  try{
    const {userid, password, newPassword} = req.body;
    if(!userid || !password || !newPassword) {
      return res.status(400).json({ok: false, message: "Data is missing"});
    }
    const updatePassword = await User.findOneAndUpdate({_id: userid, password: password}, {$set:{password: newPassword}});
    if(!updatePassword){
      return res.status(404).json({ok: false, message: "Invalid Credential"});
    }

    res.status(200).json({
      ok: true,
      message: "Password is Updated",
      userData: {userid: userid, email: updatePassword.email}
    });


  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Internal Server Error",
      errMessage: err,
    })

  }
});


export default route;