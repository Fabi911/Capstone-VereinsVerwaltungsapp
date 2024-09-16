import {Routes, Route, useNavigate} from 'react-router-dom';
import Dashboard from "./Pages/Dashboard.tsx";
import Layout from "./components/Layout/Layout.tsx";
import MembersOverview from "./Pages/MembersOverview.tsx";
import MemberDetail from "./Pages/MemberDetail.tsx";
import LoginPage from "./Pages/LoginPage.tsx";
import RegisterPage from "./Pages/RegisterPage.tsx";
import axios from "axios";
import {useEffect, useState} from "react";
import CashJournal from "./components/cashJournal/CashJournal.tsx";
import {AppUser} from "./types/AppUser.ts";

export default function App() {
	const [appUser, setAppUser] = useState<AppUser | null>(null);
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
	if (!appUser) {
		return (
			<>
				<Route path="/" element={<LoginPage login={login}/>}/>
				<Route path="/register" element={<RegisterPage/>}/>
			</>
		);
	} else {
		const isAuthorizedAdminGroup = appUser?.role === "ADMIN" || appUser?.role === "GROUP1";
		return (
			<Layout logout={logout} appUser={appUser}>
				<Routes>
					{appUser && isAuthorizedAdminGroup && (
						<>
							<Route path="/" element={<Dashboard appUser={appUser}/>}/>
							<Route path="/members" element={<MembersOverview/>}/>
							<Route path="/members/:id" element={<MemberDetail/>}/>
							<Route path="/register" element={<RegisterPage/>}/>
							<Route path="/cash-journal" element={<CashJournal/>}/>
						</>
					)}

					{appUser && appUser.role === "USER" && (
						<>
							<p>Sie sind für diesen Bereich nicht berechtigt!</p>
							<p>Bitte wenden Sie sich an Ihren Admin.</p>
						</>
					)}
				</Routes>
			</Layout>
		)
	}
	;
}