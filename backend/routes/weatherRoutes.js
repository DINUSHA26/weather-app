import express from 'express';
import { getWeatherData } from '../controller/weatherController.js';

const router = express.Router();

router.get('/', getWeatherData);

export default router;