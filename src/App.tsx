import { Home } from "lucide-react";
import { Outlet, BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/shared/Navbar";
import Publication from "./pages/publication/publication";
import Test from "./pages/testPage/test";

function Layout() {
  return (
    <>
      <NavBar/>
      <Outlet />
    </>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/t" element={<Test />} />
          <Route path="/publication" element={<Publication />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
