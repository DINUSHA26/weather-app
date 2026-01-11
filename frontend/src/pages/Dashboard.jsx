import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchWeatherData } from "../services/api";

import Navbar from "../components/Navbar";
import WeatherCard from "../components/WeatherCard";
import CacheStatus from "../components/CacheStatus";

export default function Dashboard() {
  const {
    getAccessTokenSilently,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
  } = useAuth0();

  const [data, setData] = useState({ cities: [], cacheStatus: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ⛔ Wait until Auth0 is ready
    if (isLoading) return;

    // ⛔ If not logged in, redirect safely
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    const getData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetchWeatherData(token);
        setData(response);
      } catch (err) {
        console.error("Failed to fetch weather data:", err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [
    isLoading,
    isAuthenticated,
    getAccessTokenSilently,
    loginWithRedirect,
  ]);

  // 🔄 Auth0 session restoring
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="p-10 text-center">
          Restoring your session...
        </div>
      </div>
    );
  }

  // 🔄 Data loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="p-10 text-center">
          Loading Weather Insights...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Dashboard Content */}
      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              City Comfort Rankings
            </h2>
            <p className="text-gray-500">
              Based on your custom analytics
            </p>
          </div>

          <CacheStatus status={data.cacheStatus} />
        </div>

        {/* Weather Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.cities.map((city) => (
            <WeatherCard key={city.id} city={city} />
          ))}
        </div>
      </div>
    </div>
  );
}
