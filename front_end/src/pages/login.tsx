import Button from "../components/button";
import FormField from "../components/formField";
import NavBar from "../components/navBar";
import GoogleAuthButton from "../components/googleAuthButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../utility/api";

const Login = () => {
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key:string ]: string} = {};
    if (!email) {
      newErrors.email = "Email is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Form validation failed", errors);
      return;
    }
    console.log("Login clicked", email, password);
    try {
      const response = await api.post("/user/login", {
        email, password
      });
      const data = await response.data;
      console.log("Login response", data);
      if (response.statusText !== "OK") {
        
        return;
      }
      navigator("/dashboard");
    } catch (error: any) {
      console.log("Login error", error.message, ": ", error.response.data.message);
      setErrors({ password: error.response.data.message });
      return;
    }
  }

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            Login
          </h2>
          <form
          onSubmit={handleLogin}
          >
            <FormField
              type="text"
              label="Username"
              placeholder="Enter your username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
            <FormField
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
            <Button text="Login" isSubmit={true}/>
            <GoogleAuthButton
              onSuccess={() => navigator("/dashboard")}
              onError={() => {
                alert("Login Failed");
              }}
              text="Login with google"
            />
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 padding-8"
              href="#"
            >
              Forgot Password?
            </a>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
