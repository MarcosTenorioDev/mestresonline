import { BrowserRouter, Routes, Route } from "react-router-dom";
/* import NavBar from "./components/shared/Navbar";
 */import Publication from "./pages/publication/publication";
import MyCompanies from "./pages/myCompanies/MyCompanies";
import Home from "./pages/home/Home";
import { LayoutAdmin } from "./components/shared/sidebarComponents";


function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<LayoutAdmin>
								<MyCompanies />
							</LayoutAdmin>
						}
					/>
					<Route
						path="/publication/:id"
						element={
							<LayoutAdmin>
								<Publication />
							</LayoutAdmin>
						}
					/>
					<Route
						path="/company/:id"
						element={
							<LayoutAdmin>
								<Home />
							</LayoutAdmin>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
