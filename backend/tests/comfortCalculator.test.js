import { calculateComfortScore } from '../utils/comfortCalculator.js';

describe('Comfort Score Calculation Tests (ES Modules)', () => {
    
    test('should return 100 for ideal weather (22°C, 50% humidity, 0 wind)', () => {
        const score = calculateComfortScore(22, 50, 0);
        expect(score).toBe(100);
    });

    test('should decrease score for high temperature', () => {
        // temp=25, diff is 3. 3 * 3 = 9. 100 - 9 = 91
        const score = calculateComfortScore(25, 50, 0);
        expect(score).toBe(91);
    });

    test('should decrease score when humidity is over 50%', () => {
        // humidity=60, excess is 10. 10 * 0.5 = 5. 100 - 5 = 95
        const score = calculateComfortScore(22, 60, 0);
        expect(score).toBe(95);
    });

    test('should decrease score for high wind speeds', () => {
        // wind=10. 10 * 1.5 = 15. 100 - 15 = 85
        const score = calculateComfortScore(22, 50, 10);
        expect(score).toBe(85);
    });

    test('should ensure the score is never negative', () => {
        const score = calculateComfortScore(50, 95, 40);
        expect(score).toBeGreaterThanOrEqual(0);
    });

    test('should ensure the score does not exceed 100', () => {
        const score = calculateComfortScore(22, 10, 0);
        expect(score).toBeLessThanOrEqual(100);
    });
});