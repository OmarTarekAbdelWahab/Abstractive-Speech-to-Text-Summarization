import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ProtectedLayout from "./layouts/ProtectedLayout";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login navigateOnSuccess="/" />} />
        <Route path="/signup" element={<SignUp navigateOnSuccess="/" />} />
        <Route path="/" element={<ProtectedLayout />}>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
