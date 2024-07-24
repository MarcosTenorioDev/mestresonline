import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";
import { ptBR } from "@clerk/localizations";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!clerkPubKey) {
  throw new Error("Missing Publishable Key");
}
const ClerkWithRoutes = () => {

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      appearance={{
        variables: { colorPrimary: "blue" },
      }}
      localization={ptBR}
    >
      <App />
    </ClerkProvider>
  );
};
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContainer className="z-[999999999999999999999]"/>
    <ClerkWithRoutes/>
  </React.StrictMode>
);
