import { BrowserRouter, Routes, Route } from "react-router-dom";
import Publication from "./pages/publication/publication";
import MyCompanies from "./pages/myCompanies/MyCompanies";
import Home from "./pages/home/Home";
import { LayoutAdmin } from "./components/shared/sidebarComponents";
import ProducersPage from "./pages/producers/ProducersPage";
import TopicsPage from "./pages/topics/TopicsPage";
import CaptationPage from "./pages/captationPage/CaptationPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import PostPage from "./pages/PostPage/PostPage";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<>
								<CaptationPage />
							</>
						}
					/>
					<Route 
					path="/:profile"
					element={
						<BlogPage />
					}/>
					<Route
						path="/myProfiles"
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
						path="/profile/:id"
						element={
							<LayoutAdmin>
								<Home />
							</LayoutAdmin>
						}
					/>
					<Route
						path="/author/:id"
						element={
							<LayoutAdmin>
								<ProducersPage />
							</LayoutAdmin>
						}
					/>
					<Route
						path="/topics/:id"
						element={
							<LayoutAdmin>
								<TopicsPage />
							</LayoutAdmin>
						}
					/>
						<Route
						path="/:publicCode/post/:postId"
						element={
							<>
								<PostPage />
							</>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
