import axios from 'axios';
import fs from 'fs';
import NodeCache from 'node-cache';
import { calculateComfortScore } from '../utils/comfortCalculator.js';

const cache = new NodeCache({ stdTTL: 300 }); // Cache data for 5 minutes [cite: 67]

export const getWeatherData = async (req, res) => {
    // Check whether data exists in cache [cite: 69]
    const cachedData = cache.get("weather_data");
    if (cachedData) {
        return res.json({ cities: cachedData, cacheStatus: "HIT" }); // Indicate Cache HIT [cite: 69]
    }

    try {
        // Read cities.json file [cite: 16, 39, 40]
        const rawData = fs.readFileSync('./data/cities.json');
        const citiesList = JSON.parse(rawData).List;

        const weatherPromises = citiesList.map(async (city) => {
            // Fetch weather data from OpenWeatherMap API [cite: 17, 41, 44]
            const url = `https://api.openweathermap.org/data/2.5/weather?id=${city.CityCode}&units=metric&appid=${process.env.WEATHER_API_KEY}`;
            const response = await axios.get(url);
            const data = response.data;

            const score = calculateComfortScore(
                data.main.temp,
                data.main.humidity,
                data.wind.speed
            );

            return {
                id: data.id,
                name: data.name,
                temp: data.main.temp,
                description: data.weather[0].description,
                comfortScore: score
            };
        });

        const results = await Promise.all(weatherPromises);

        // Rank cities based on comfort score [cite: 21, 37, 58]
        const sortedResults = results
            .sort((a, b) => b.comfortScore - a.comfortScore)
            .map((city, index) => ({ ...city, rank: index + 1 }));

        // Store data in cache [cite: 68]
        cache.set("weather_data", sortedResults);

        res.json({ cities: sortedResults, cacheStatus: "MISS" }); // Indicate Cache MISS [cite: 69]

    } catch (error) {
        res.status(500).json({ message: "Error fetching weather data" });
    }
};
