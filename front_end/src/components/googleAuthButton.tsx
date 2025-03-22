// src/components/GoogleAuthButton.tsx
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { authService } from "../services/googleLogin";

interface GoogleAuthButtonProps {
  onSuccess: () => void;
  text: string;
}

const GoogleAuthButton = (props: GoogleAuthButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        console.log("Google Access Token:", tokenResponse.access_token);
        const response = await authService.googleLogin(
          tokenResponse.access_token
        );

        // Store auth data
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));

        props.onSuccess?.();
      } catch (err) {
        console.error("Auth error:", err);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <button
      type="button"
      onClick={() => handleGoogleLogin()}
      disabled={loading}
      className="border border-gray-500 border-opacity-50 my-2 flex items-center justify-center w-full bg-white hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-lg transition duration-200"
    >
      <img
        src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
        alt="Google"
        className="w-6 h-6 mr-2"
      />
      {props.text}
    </button>
  );
};

export default GoogleAuthButton;
