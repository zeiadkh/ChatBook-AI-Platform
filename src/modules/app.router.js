// app-router.js

import cors from "cors";
import express from "express";
import fs from 'fs/promises';
import swaggerUi from 'swagger-ui-express';

import authRouter from "./auth/auth.router.js";
import bookRouter from "./book/book.router.js";
import summaryRouter from "./summarizer/sum.router.js";
import userRouter from "./user/user.router.js";

export default async function setupApp(app) {
  app.use(express.json());
  app.use(cors());
  
  // Add your existing routes
  app.use("/auth", authRouter);
  app.use("/book", bookRouter);
  app.use("/summary", summaryRouter);
  app.use("/user", userRouter);
  
  // Read the Swagger JSON file synchronously
  try {
    const swaggerDocumentData = await fs.readFile('./swagger_output.json', 'utf-8');
    const swaggerDocument = JSON.parse(swaggerDocumentData);
    
    // Serve Swagger documentation using Swagger UI
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  } catch (error) {
    console.error('Error reading Swagger JSON file:', error);
    process.exit(1); // Exit the process if there's an error
  }

  // Handle 404 errors
  app.all("*", (req, res, next) => next(new Error("Page not found", { cause: 404 })));

  // Error handling middleware
  app.use((err, req, res, next) =>
    res.status(err.cause || 500).json({
      success: false,
      message: err.message,
      stack: err.stack
      // ...(process.env.mode == "DEV" ? { stack: err.stack } : ""),
    })
  );
}
