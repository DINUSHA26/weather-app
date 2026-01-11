export default function WeatherCard({ city }) {
  return (
    <div className="relative bg-white/90 backdrop-blur-md p-6 rounded-3xl 
                    shadow-md border border-gray-100 
                    hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            {city.name}
          </h3>
          <p className="text-sm text-gray-500 capitalize">
            {city.description}
          </p>
        </div>

        {/* Rank Badge */}
        <span className="bg-gradient-to-r from-blue-500 to-indigo-600 
                         text-white text-xs font-bold px-3 py-1 rounded-full shadow">
          #{city.rank}
        </span>
      </div>

      {/* Weather Icon */}
      <div className="flex items-center justify-center my-6">
        <div className="text-6xl">
          {city.temp > 30 ? "☀️" : city.temp > 20 ? "⛅" : "❄️"}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 border-t pt-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Temperature
          </p>
          <p className="text-2xl font-bold text-gray-800">
            {city.temp}°C
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Comfort
          </p>
          <p className="text-3xl font-black text-green-500">
            {city.comfortScore}
          </p>
        </div>
      </div>
    </div>
  );
}
