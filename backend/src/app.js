import express from 'express';
import cors from 'cors';

import auth from './routes/auth.js';



const app = express();


// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//فحص اتصال السيرفر 
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.use('/api/auth',auth);

import serviceRoutes from './routes/serviceRoutes.js';
app.use('/api/services', serviceRoutes);

import doctorRoutes from './routes/doctorRoutes.js';
app.use('/api/doctors', doctorRoutes);

import appointmentsRoutes from './routes/appointmentsRoutes.js';
app.use("/api/appointments", appointmentsRoutes);

//Reviews
import reviewsRoutes from "./routes/reviewsRoutes.js"
app.use("/api/reviews",reviewsRoutes)
export default app;
