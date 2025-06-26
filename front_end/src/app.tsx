import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedLayout from "./layouts/ProtectedLayout";
import Home from "./pages/Home";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import Dashboard from "./pages/dashboard";

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
