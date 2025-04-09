import { useEffect } from "react";
import { Button } from "@/components/ui/button"

declare global {
  interface Window {
    google?: any;
  }
}

const SignInButton = () => {
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID",
        callback: handleCredentialResponse,
      });
    }
  }, []);

  const handleCredentialResponse = (response: any) => {
    const jwt = response.credential;
    // You can decode it using jwt-decode or send it to your backend
    console.log("JWT Token:", jwt);
  };

  const handleClick = () => {
    window.google.accounts.id.prompt(); // shows the one-tap or popup
  };

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      className="hidden sm:flex border-[#C89B3C] text-[#C89B3C] hover:bg-[#C89B3C] hover:text-[#091428]"
    >
      Sign In with Google
    </Button>
  );
};

export default SignInButton;
