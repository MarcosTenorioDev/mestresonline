import NavBar from "@/components/shared/Navbar";
import Home from "../pages/home/Home";
import { Outlet, BrowserRouter, Route, Routes } from "react-router-dom";
import Publication from "@/pages/publication/publication";

function Layout() {
  return (
    <>
      <NavBar/>
      <Outlet />
    </>
  );
}

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/publication" element={<Publication />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;