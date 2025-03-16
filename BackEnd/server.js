import dotenv from 'dotenv';
import express, { json } from 'express';
import errorHandler from './middleware/errorHandler.js';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(json());


app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the backend!' });
});

app.use(errorHandler);
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});