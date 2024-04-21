import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";
import { ptBR } from "@clerk/localizations";

const clerkPubKey = "pk_test_b3JpZW50ZWQtY2hpY2tlbi0zMy5jbGVyay5hY2NvdW50cy5kZXYk";
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
    <ClerkWithRoutes/>
  </React.StrictMode>
);
