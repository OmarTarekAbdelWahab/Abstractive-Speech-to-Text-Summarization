import Button from "../components/button";
import FormField from "../components/formField";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navBar";
import GoogleAuthButton from "../components/googleAuthButton";

const SignUp = () => {
  const navigator = useNavigate();
  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            Sign Up
          </h2>
          <form>
            <FormField
              type="email"
              label="Email"
              placeholder="Enter your email"
            />
            <FormField
              type="password"
              label="Password"
              placeholder="Enter your password"
            />
            <FormField
              type="password"
              label="Confirm Password"
              placeholder="Re-enter your password"
            />
            <Button
              text="Sign Up"
              onClick={() => {
                navigator("/login");
                console.log("Sign Up");
              }}
            />
            <GoogleAuthButton
              onSuccess={() => navigator("/dashboard")}
              text="Sign Up with Google"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
