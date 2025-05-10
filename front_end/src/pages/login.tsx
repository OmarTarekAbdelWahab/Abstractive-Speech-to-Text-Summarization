import Button from "../components/Button";
import FormField from "../components/FormField";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/AuthContext";

const Login = ({ navigateOnSuccess }: { navigateOnSuccess: string}) => {
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const { logUserIn } = useAuth();

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
    try {
      await logUserIn({ email, password });
      navigator(navigateOnSuccess);
    } catch (error: any) {
      console.log("Login error", error.message, ": ", error.response.data.message);
      setErrors({ password: error.response.data.message });
      return;
    }
  }

  return (
    <>
      <div className="flex font-primary items-center justify-center min-h-screen bg-background">
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
            <div className="flex items-center justify-center">
              <p>Don't have an account?{" "}
                <Link to="/signup" className="font-bold underline hover:underline hover:text-secondary cursor-pointer">
                  Sign Up now
                </Link>
              </p>
            </div>
            <Button text="Login" isSubmit={true}/>
            <GoogleAuthButton
              onSuccess={() => navigator(navigateOnSuccess)}
              onError={() => {
                alert("Login Failed");
              }}
              text="Login with google"
            />
            {/* <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 padding-8"
              href="#"
            >
              Forgot Password?
            </a> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
