// app.js

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './DB/Connnection.js';
import appRouter from './src/modules/app.router.js';


dotenv.config();

const app = express();
const port = process.env.PORT;

// Read the Swagger JSON file synchronously


  // Start the Express server
  appRouter(app, express);
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
  connectDB();

