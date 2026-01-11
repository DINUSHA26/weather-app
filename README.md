# 🌦️ WeatherWise – City Comfort Analytics Platform

WeatherWise is a full-stack web application that ranks cities based on a **Comfort Index Score** calculated from real-time weather conditions.
The platform uses **React + Auth0** on the frontend and **Node.js + Express** on the backend, with a lightweight caching strategy to improve performance.

---

## 📁 Project Structure

```
root/
├── backend/
│   ├── config/
│   ├── controller/
│   │   └── weatherController.js
│   ├── data/
│   │   └── cities.json
│   ├── routes/
│   │   └── weatherRoutes.js
│   ├── utils/
│   │   └── comfortCalculator.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
```

---

## 🚀 Setup Instructions

### 🔧 Prerequisites

* Node.js (v18 or later)
* npm
* Auth0 account

---

### ▶️ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```
PORT=5000
WEATHER_API_KEY=your_api_key_here
```

Start the backend:

```bash
nodemon server.js
```

---

### ▶️ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

### 🔐 Auth0 Configuration

In Auth0 Dashboard → Application Settings:

```
Allowed Callback URLs:
http://localhost:5173

Allowed Logout URLs:
http://localhost:5173

Allowed Web Origins:
http://localhost:5173
```

---

## 📊 Comfort Index Formula

The **Comfort Index Score** ranges from **0 to 100**, where a higher score indicates a more comfortable city.

### Formula Implementation

```js
score = 100 - (temperatureImpact + humidityImpact + windImpact)
```

### Parameter Details

| Factor      | Description              |
| ----------- | ------------------------ |
| Temperature | Distance from ideal 22°C |
| Humidity    | Penalized above 50%      |
| Wind Speed  | Linear comfort reduction |

---

## 🧮 Comfort Score Calculation Logic

```js
const tempImpact = Math.abs(temp - 22) * 3;
const humidityImpact = humidity > 50 ? (humidity - 50) * 0.5 : 0;
const windImpact = windSpeed * 1.5;
```

Final score is clamped between **0 and 100**.

---

## ⚖️ Reasoning Behind Variable Weights

### 🌡️ Temperature (×3)

* Temperature has the **strongest influence** on human comfort.
* Even small deviations from the ideal range significantly affect comfort.

### 💧 Humidity (×0.5)

* Moderate humidity is acceptable.
* Comfort decreases gradually after 50%.

### 🌬️ Wind Speed (×1.5)

* Wind affects perceived temperature.
* Strong winds reduce comfort but less aggressively than temperature.

---

## 🔄 Trade-offs Considered

| Decision                | Trade-off                                       |
| ----------------------- | ----------------------------------------------- |
| Simple linear model     | Less precise than complex meteorological models |
| Fixed ideal temperature | Does not adapt to regional preferences          |
| Client-friendly scoring | Sacrifices scientific accuracy for clarity      |

---

## 🗄️ Cache Design Explanation

* Backend caches the weather response temporarily.
* Prevents repeated API calls for the same data.
* Cache status is exposed to frontend (`HIT` / `MISS`).

### Benefits:

* Faster response times
* Reduced external API usage
* Lower operational cost

---

## ⚠️ Known Limitations

* Comfort formula is **simplified** and not medically accurate
* Ideal temperature is globally fixed at 22°C
* No seasonal or regional adaptation
* Cache is memory-based (resets on server restart)
* Not optimized for extreme weather conditions

---

## 📌 Future Improvements

* Regional comfort profiles
* Persistent cache (Redis)
* Seasonal weight adjustment
* Accessibility improvements
* Offline mode

---

## 👨‍💻 Author

Built with ❤️ using React, Node.js, and Auth0.
