import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

function NavBar() {
  const { logUserOut } = useAuth();
  return (
    <nav className="sticky top-0 font-title bg-primary text-text p-4 flex justify-between items-center">
      <h1 className="text-4xl font-extrabold">Speech Summarizer</h1>
      <div>
        <Link 
          to="/login" 
          className="text-2xl font-extrabold hover:underline"
          onClick={() => logUserOut()}
        >
          Sign Out
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
