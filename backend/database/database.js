import mongoose from 'mongoose';

const connectDB = () => {

  mongoose.connect(`mongodb+srv://arun04:Arundas123@projects.nta8xc0.mongodb.net/?retryWrites=true&w=majority&appName=Projects`, {
    dbname: 'note-app'
  })
  .then(() => {
    console.log(`Database is connected`);

  })
  .catch((err) => {
    console.log(`Error in database connection: `+ err);

  });
}

export default connectDB;