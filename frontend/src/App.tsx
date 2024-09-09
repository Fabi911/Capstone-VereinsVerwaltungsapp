import {Routes, Route} from 'react-router-dom';
import Dashboard from "./Pages/Dashboard.tsx";
import Layout from "./components/Layout/Layout.tsx";
import MembersOverview from "./Pages/MembersOverview.tsx";
import MemberDetail from "./Pages/MemberDetail.tsx";
import LoginPage from "./Pages/LoginPage.tsx";
import RegisterPage from "./Pages/RegisterPage.tsx";
import axios from "axios";
import {useState} from "react";

function App() {
	const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

	function logout() {
		axios.post("/api/users/logout")
			.then(() => {
				setIsUserLoggedIn(false);
				console.log("Logout successful");
			})
			.catch(e => {
				console.error(e);
			})
	}

	if (!isUserLoggedIn) {
		return (
			<Layout logout={logout} isUserLoggedIn={isUserLoggedIn}>
				<LoginPage setIsUserLoggedIn={setIsUserLoggedIn}/>
			</Layout>
		)
	}
	return (
		<Layout logout={logout} isUserLoggedIn={isUserLoggedIn}>
			<Routes>
				<Route path="/login" element={<LoginPage setIsUserLoggedIn={setIsUserLoggedIn}/>}/>
				<Route path="/" element={<Dashboard/>}/>
				<Route path="/members" element={<MembersOverview/>}/>
				<Route path="/members/:id" element={<MemberDetail/>}/>
				<Route path="/register" element={<RegisterPage/>}/>
			</Routes>
		</Layout>
	)
}

export default App