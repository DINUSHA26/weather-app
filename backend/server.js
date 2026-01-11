import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import weatherRoutes from './routes/weatherRoutes.js';

const app = express();

app.use(cors()); // To prevent CORS errors
app.use(express.json());

// API Endpoints
app.use('/api/weather', weatherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
