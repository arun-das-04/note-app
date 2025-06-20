import mongoose from 'mongoose';

const userModel = new mongoose.Schema({
  email:{
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  name: {
    type: String,
    require: true
  }

},
{
  timestamps: true,
  collection: 'users'
});

const User = mongoose.model('User', userModel);

export default User;