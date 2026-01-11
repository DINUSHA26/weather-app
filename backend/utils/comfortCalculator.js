/**
 * Comfort Index Score calculation (0–100)
 * Parameters: Temperature, Humidity, Wind Speed [cite: 25, 26, 27, 28]
 */
export const calculateComfortScore = (temp, humidity, windSpeed) => {
    // The ideal temperature is considered to be 22°C, and the score decreases as it deviates from this value.
    const tempImpact = Math.abs(temp - 22) * 3;
    
    // High humidity negatively affects comfort.
    const humidityImpact = humidity > 50 ? (humidity - 50) * 0.5 : 0;
    
    // Increased wind speed reduces comfort.
    const windImpact = windSpeed * 1.5;

    let score = 100 - (tempImpact + humidityImpact + windImpact);
    
    // Ensure the score remains within the range of 0 to 100.
    return Math.max(0, Math.min(100, Math.round(score)));
};
