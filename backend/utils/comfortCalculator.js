/**
 * Comfort Index Score ගණනය කිරීම (0-100) 
 * Parameters: Temperature, Humidity, Wind Speed [cite: 25, 26, 27, 28]
 */
export const calculateComfortScore = (temp, humidity, windSpeed) => {
    // පරමාදර්ශී උෂ්ණත්වය 22°C ලෙස සලකා ඇති අතර, එයින් බැහැර වන විට ලකුණු අඩු වේ.
    const tempImpact = Math.abs(temp - 22) * 3;
    
    // අධික ආර්ද්‍රතාවය සුවපහසුවට බාධා කරයි.
    const humidityImpact = humidity > 50 ? (humidity - 50) * 0.5 : 0;
    
    // සුළඟේ වේගය වැඩි වීම සුවපහසුව අඩු කරයි.
    const windImpact = windSpeed * 1.5;

    let score = 100 - (tempImpact + humidityImpact + windImpact);
    
    // අගය 0 සහ 100 අතර පරාසයක තබා ගැනීම 
    return Math.max(0, Math.min(100, Math.round(score)));
};