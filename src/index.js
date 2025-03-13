import express from 'express';
import appRouter from './app.router.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000


//parsing the json
app.use(express.json()); 
appRouter(app,express);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port 3000...`);
});
