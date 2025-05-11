import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import NavBar from "../components/NavBar";

const ProtectedLayout = () => {
  const { user } = useAuth();
  console.log("Current user in: ", user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <main className="flex-1 overflow-auto mt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;