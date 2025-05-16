import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

function NavBar() {
  const { logUserOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 font-title bg-primary text-text p-4 flex justify-between items-center shadow-md h-16">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
        Speech Summarizer
      </h1>
      <div className=" md:flex space-x-4">
        <Link
          to="/"
          className="text-lg sm:text-xl md:text-2xl font-bold hover:underline"
        >
          Home
        </Link>
        <Link
          to="/login"
          className="text-lg sm:text-xl md:text-2xl font-bold hover:underline"
          onClick={logUserOut}
        >
          Sign Out
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;