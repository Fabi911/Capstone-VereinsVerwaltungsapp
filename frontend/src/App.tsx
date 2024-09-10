import {Routes, Route, useNavigate} from 'react-router-dom';
import Dashboard from "./Pages/Dashboard.tsx";
import Layout from "./components/Layout/Layout.tsx";
import MembersOverview from "./Pages/MembersOverview.tsx";
import MemberDetail from "./Pages/MemberDetail.tsx";
import LoginPage from "./Pages/LoginPage.tsx";
import RegisterPage from "./Pages/RegisterPage.tsx";
import axios from "axios";
import {useEffect, useState} from "react";

export type AppUser = {
	id: string
	username: string;
	role: "ADMIN" | "USER";
}
export default function App() {
	const [appUser, setAppUser] = useState<AppUser | null >(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();

	function login(username: string, password: string) {
		axios.post("/api/users/login", {}, {
			auth: {
				username: username,
				password: password
			}
		})
			.then(() => {
				console.log("Login successful");
				fetchMe();
				setIsLoggedIn(true);
				navigate("/");
			})
			.catch(e => {
				setAppUser(null);
				console.error(e)
			});
	}

	function logout() {
		axios.post("/api/users/logout")
			.then(() => {
				setIsLoggedIn(false);
				console.log("Logout successful");
			})
			.catch(e => console.error(e))
			.finally(() => setAppUser(null));
	}

	function fetchMe() {
		axios.get("/api/users/me")
			.then(res => setAppUser(res.data))
			.catch(e => {
				console.error(e);
			})
	}

	useEffect(() => {
		fetchMe();
	}, []);

	console.log("appUser: "+appUser);

	if (!isLoggedIn) {
		return (
			<Layout logout={logout} isLoggedIn={isLoggedIn}>
				<Routes>
					<Route path="/" element={<LoginPage login={login}/>}/>
					<Route path="/register" element={<RegisterPage/>}/>
				</Routes>
			</Layout>
		)
	}
	return (
		<Layout logout={logout} isLoggedIn={isLoggedIn}>
			{
				appUser?.role === "ADMIN" && <Routes>
					<Route path="/login" element={<LoginPage login={login}/>}/>
					<Route path="/" element={<Dashboard/>}/>
					<Route path="/members" element={<MembersOverview/>}/>
					<Route path="/members/:id" element={<MemberDetail/>}/>
					<Route path="/register" element={<RegisterPage/>}/>
				</Routes>
			}
			{
				appUser?.role === "USER" &&
				<>
					<p>Sie sind für diesen Bereich nicht berechtigt!</p>
					<p>Bitte wenden Sie sich an Ihren Admin.</p>
				</>
			}
		</Layout>
	)
}