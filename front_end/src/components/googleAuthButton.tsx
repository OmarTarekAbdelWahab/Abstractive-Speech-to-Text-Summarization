// src/components/GoogleAuthButton.tsx
import { GoogleLogin } from "@react-oauth/google";
import api from "../utility/api";

interface GoogleAuthButtonProps {
  onSuccess: () => void;
  onError: () => void;
  text: string;
}

const GoogleAuthButton = (props: GoogleAuthButtonProps) => {

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const response = await api.post("/auth/google", {
        credential: credentialResponse.credential,
      })

      if (response.statusText != "OK") {
        throw new Error("Failed to authenticate");
      }

      const data = await response.data;
      console.log("Server Response:", data);
      props.onSuccess();
    } catch (error) {
      console.error("Error during authentication:", error);
      props.onError();
    }
  }

  return (
    <GoogleLogin
      onSuccess={handleGoogleLogin}
      onError={() => {
        console.error("Google Login Failed");
        props.onError();
      }}
    />
  );
};

export default GoogleAuthButton;
