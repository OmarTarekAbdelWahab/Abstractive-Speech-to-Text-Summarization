// src/components/GoogleAuthButton.tsx
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import api from "../services/api";
import { useAuth } from "../hooks/AuthContext";

interface GoogleAuthButtonProps {
  onSuccess: () => void;
  onError: () => void;
  text: string;
}

const GoogleAuthButton = (props: GoogleAuthButtonProps) => {
  const { logUserIn } = useAuth();

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("No credential received from Google.");
      }
      console.log("Google Login Response:", credentialResponse);
      await logUserIn(credentialResponse.credential);
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
