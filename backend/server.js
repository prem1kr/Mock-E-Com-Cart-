import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: '*',  // Allow only frontend origin
  optionsSuccessStatus: 200 // For legacy browsers support
}));

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.get('/', (req, res) => {
  res.send('Vibe Commerce API running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
