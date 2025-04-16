import Button from "../components/button";
import FormField from "../components/formField";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navBar";
import GoogleAuthButton from "../components/googleAuthButton";
import { useState } from "react";

const SignUp = () => {
  const navigator = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key:string ]: string} = {};
    if (!username) {
      newErrors.username = "Username is required";
    }
    if (!email) {
      newErrors.email = "Email is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
      
    setErrors(newErrors);
    return Object.keys(errors).length === 0;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Form validation failed", errors);
      return;
    }

    console.log("Signup clicked", username, email, password, confirmPassword);

    const response = await fetch("http://localhost:5000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        username, email, password
      }),
    });

    const data = await response.json();
    console.log("Server Response:", data);
  }
  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            Sign Up
          </h2>
          <form
            onSubmit={handleLogin}
          >
            <FormField
              type="text"
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
            />
            <FormField
              type="email"
              label="Email"
              placeholder="Enter your email"
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
            <FormField
              type="password"
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
            />
            <Button
              text="Sign Up"
              isSubmit={true}
            />
            <GoogleAuthButton
              onSuccess={() => navigator("/dashboard")}
              onError={() => {
                alert("Sign Up Failed");
              }}
              text="Sign Up with Google"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
