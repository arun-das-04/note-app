// Functions import
import connectDB from './database/database.js';
import route from './routes/mainRoutes.js';

// Module import
import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';

// Configuration
const app = express();
dotenv.config();
connectDB();

app.use(cors('*'));
app.use(express.json());

// app servers
app.use('/', route);


// listen server
app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is started on http://localhost:3001`);
});