import { useAuth0 } from "@auth0/auth0-react";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  // ලොග් වී ඇත්නම් පමණක් Dashboard එක පෙන්වයි 
  return (
    <>
      {isAuthenticated ? <Dashboard /> : <LoginPage />}
    </>
  );
}

export default App;