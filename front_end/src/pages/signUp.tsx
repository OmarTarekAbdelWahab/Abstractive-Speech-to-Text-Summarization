import Button from "../components/button";
import FormField from "../components/formField";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navBar";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { useState } from "react";
import { useAuth } from "../hooks/AuthContext";

const SignUp = ({ navigateOnSuccess }: { navigateOnSuccess: string}) => {
  const navigator = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const { registerUser } = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
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
    return Object.keys(newErrors).length === 0;
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Form validation failed", errors);
      return;
    }

    console.log("Signup clicked", username, email, password, confirmPassword);

    try {
      await registerUser({ username, email, password });
      navigator(navigateOnSuccess);
    } catch (error: any) {
      const data = error.response.data;
      console.log("Error response", data);
      
      const newErrors: Record<string, string> = {};
      for (const field in data.errors) {
        newErrors[field] = data.errors[field].message;
      }

      console.log(newErrors)
      setErrors(newErrors);
      return;
    }
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
            onSubmit={handleSignup}
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
              onSuccess={() => navigator(navigateOnSuccess)}
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
