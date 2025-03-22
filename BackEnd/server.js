import dotenv from 'dotenv';
import express, { json } from 'express';
import cors from 'cors';
import connectDB from './DataBase/DB.js'
import userRoutes from './routes/uesr_api.js';

import errorHandler from './middleware/errorHandler.js';

dotenv.config();

connectDB();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(json());

// app.use(tokenVerifier);

app.use('/user', userRoutes);

app.use(errorHandler);


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});