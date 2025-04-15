import Button from "../components/button";
import FormField from "../components/formField";
import NavBar from "../components/navBar";
// import { useState } from "react";
import GoogleAuthButton from "../components/googleAuthButton";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigator = useNavigate();

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            Login
          </h2>
          <form>
            <FormField
              type="text"
              label="Username"
              placeholder="Enter your username"
            />
            <FormField
              type="password"
              label="Password"
              placeholder="Enter your password"
            />
            <Button text="Login" onClick={() => {}} />
            <GoogleAuthButton
              onSuccess={() => navigator("/dashboard")}
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
