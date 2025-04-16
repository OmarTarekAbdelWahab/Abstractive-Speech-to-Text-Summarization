// src/components/GoogleAuthButton.tsx
import { GoogleLogin } from "@react-oauth/google";

interface GoogleAuthButtonProps {
  onSuccess: () => void;
  onError: () => void;
  text: string;
}

const GoogleAuthButton = (props: GoogleAuthButtonProps) => {

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const response = await fetch("http://localhost:5000/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      if (!response.ok) {
        throw new Error("Failed to authenticate");
      }

      const data = await response.json();
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
