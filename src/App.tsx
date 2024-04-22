import  Home  from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/shared/Navbar";
import Publication from "./pages/publication/publication";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><NavBar /><Home /></>} />
          <Route path="/publication" element={<><NavBar /><Publication /></>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
