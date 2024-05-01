import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/shared/Navbar";
import Publication from "./pages/publication/publication";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Auth } from "./pages/auth/Auth";

function Layout({ children }: any) {
  return (
    <>
      <SignedOut>
        <Auth />
      </SignedOut>
      <SignedIn>
        <NavBar />
        {children}
      </SignedIn>
    </>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/publication"
            element={
              <Layout>
                <Publication />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
