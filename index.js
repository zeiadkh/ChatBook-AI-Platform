// app.js

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './DB/Connnection.js';
import appRouter from './src/modules/app.router.js';
import cors from 'cors'


dotenv.config();

const app = express();
app.use(cors())
const port = process.env.PORT;

  // Start the Express server
  appRouter(app, express);
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
  connectDB();

