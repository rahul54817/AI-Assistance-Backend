// app.ts
import express from 'express';
import cors from 'cors'
import userRoutes from './routes/userRoutes'
import geminiRoutes from './routes/geminRoutes'
const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', userRoutes)
app.use("/gemini", geminiRoutes);



export default app;