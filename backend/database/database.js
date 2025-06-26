import mongoose from 'mongoose';

const connectDB = () => {

  mongoose.connect(process.env.MongoURI, {
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