import { Router } from 'express';
import User from '../database/models/userModel.js';
import Note from '../database/models/noteModel.js';

const route = Router();


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
    res.send({code: 400, message: 'Email failed to Update due to Server Error', errMessage: err.message});
  }
});



route.patch('/editnote', async (req, res) => {
  try{
    const {noteid, newTitle, newContent} = req.body;
    console.log(req.body);
    
    const updateNote = await Note.findOneAndUpdate({_id: noteid}, {$set:{title: newTitle, content: newContent}});
    if(updateNote){
      res.send({code: 200, message: 'Note is updated'});
    }
    else{
      res.send({code: 404, mesage: 'Note is failed to Update'});
    }

  }
  catch(err){
    res.send({code: 400, message: 'Internal Server Error', errMessage: err.message});
    
  }
});


export default route;