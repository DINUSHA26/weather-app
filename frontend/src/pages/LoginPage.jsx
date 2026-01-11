import { useAuth0 } from "@auth0/auth0-react";

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-sky-400 to-indigo-600">
      
      {/* Card */}
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-[350px] text-center">
        
        {/* Logo / Icon */}
        <div className="text-5xl mb-4">🌤️</div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800">
          Weather App
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 mt-2 mb-8">
          Login to check real-time weather updates
        </p>

        {/* Login Button */}
        <button
          onClick={() => loginWithRedirect()}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg
                     hover:bg-blue-700 hover:scale-105 transition-all duration-300"
        >
          🔐 Login with Auth0
        </button>

        {/* Footer text */}
        <p className="text-sm text-gray-400 mt-6">
          Secure login powered by Auth0
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
