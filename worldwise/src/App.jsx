import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";

function App() {
	return (
		<div>
			{/* <h1>Hello Router!</h1> */}
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={<Homepage></Homepage>}
					></Route>
					<Route
						path='product'
						element={<Product></Product>}
					></Route>
					<Route
						path='pricing'
						element={<Pricing></Pricing>}
					></Route>
					<Route
						path='app'
						element={<AppLayout></AppLayout>}
					></Route>
					<Route
						path='*'
						element={<PageNotFound></PageNotFound>}
					></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
