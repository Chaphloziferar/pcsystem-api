import env from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Importing Routes
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';

// Initialize the app
env.config();
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Routes Middleware
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);

export default app;