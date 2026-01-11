import axios from 'axios';
import fs from 'fs';
import NodeCache from 'node-cache';
import { calculateComfortScore } from '../utils/comfortCalculator.js';

const cache = new NodeCache({ stdTTL: 300 }); // දත්ත විනාඩි 5ක් Cache කර තැබීම [cite: 67]

export const getWeatherData = async (req, res) => {
    // Cache එකේ දත්ත තිබේදැයි පරීක්ෂා කිරීම [cite: 69]
    const cachedData = cache.get("weather_data");
    if (cachedData) {
        return res.json({ cities: cachedData, cacheStatus: "HIT" }); // Cache HIT පෙන්වීම [cite: 69]
    }

    try {
        // cities.json ගොනුව කියවීම [cite: 16, 39, 40]
        const rawData = fs.readFileSync('./data/cities.json');
        const citiesList = JSON.parse(rawData).List;

        const weatherPromises = citiesList.map(async (city) => {
            // OpenWeatherMap API එකෙන් දත්ත ලබා ගැනීම [cite: 17, 41, 44]
            const url = `https://api.openweathermap.org/data/2.5/weather?id=${city.CityCode}&units=metric&appid=${process.env.WEATHER_API_KEY}`;
            const response = await axios.get(url);
            const data = response.data;

            const score = calculateComfortScore(data.main.temp, data.main.humidity, data.wind.speed);

            return {
                id: data.id,
                name: data.name,
                temp: data.main.temp,
                description: data.weather[0].description,
                comfortScore: score
            };
        });

        const results = await Promise.all(weatherPromises);

        // සුවපහසු අගය අනුව නගර ශ්‍රේණිගත කිරීම (Ranking) [cite: 21, 37, 58]
        const sortedResults = results
            .sort((a, b) => b.comfortScore - a.comfortScore)
            .map((city, index) => ({ ...city, rank: index + 1 }));

        // දත්ත Cache එකට ඇතුළත් කිරීම [cite: 68]
        cache.set("weather_data", sortedResults);

        res.json({ cities: sortedResults, cacheStatus: "MISS" }); // Cache MISS පෙන්වීම [cite: 69]

    } catch (error) {
        res.status(500).json({ message: "Error fetching weather data" });
    }
};