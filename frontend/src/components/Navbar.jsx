import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
  const { user, logout } = useAuth0();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
          WeatherWise
        </h1>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          
          {/* User Info */}
          {user && (
            <div className="flex items-center gap-2">
              <img
                src={user.picture}
                alt="User"
                className="w-9 h-9 rounded-full border border-gray-300"
              />
              <span className="hidden sm:block text-sm font-medium text-gray-700">
                {user.email}
              </span>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
