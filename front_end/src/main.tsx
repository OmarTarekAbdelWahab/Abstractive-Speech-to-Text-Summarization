import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./app.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <GoogleOAuthProvider clientId="665631578062-b8bgb3if6s9f0t9iian65fr6p52fofe1.apps.googleusercontent.com"> */}
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
