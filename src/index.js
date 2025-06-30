import express from 'express';
import connectDB from './db/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import loggerMiddleware from './middleware/loggermiddleware.js';
import AuthMiddleWare from './middleware/authmiddleware.js';
import errorHandler from './middleware/errormiddleware.js';
import swaggerSpec from '../swagger.js';
import swaggerUi from 'swagger-ui-express';






dotenv.config();
connectDB()
const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.json());
app.use(cookieParser());
app.use(loggerMiddleware)
app.use(AuthMiddleWare)
app.use(errorHandler)

app.use('/api/auth', authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


    
app.listen(PORT ,()=>{
   console.log(`server Running on Port ${PORT}`)
  console.log(`Swagger Docs at http://localhost:${PORT}/api-docs`);
});
