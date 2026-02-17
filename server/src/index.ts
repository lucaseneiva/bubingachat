import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';      
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.routes.js';
import { errorMiddleware } from './middleware/error.middleware.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3001;

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, error: 'Too many requests, please try again later.' },
});

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api', limiter);

app.get('/', (_req, res) => res.send('BubingaChat API'));
app.use('/api/auth', authRoutes);
app.use(errorMiddleware);

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('send_message', (data) => {
    io.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});

httpServer.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));