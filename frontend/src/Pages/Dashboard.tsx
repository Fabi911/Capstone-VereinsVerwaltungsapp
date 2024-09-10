import {Link} from "react-router-dom";
import UsersList from "../components/UsersList/UsersList.tsx";
import {AppUser} from "../App.tsx";

type DashboardProps = {
	appUser: AppUser | null;
}
export default function Dashboard({appUser}: DashboardProps) {
	return (
		<>
			{appUser?.role === "ADMIN" &&
				<div>
					<h1>Dashboard</h1>
					<p>Welcome to the dashboard</p>
					<Link to="/members">Mitglieder - Übersicht</Link>
					<br/>
					<Link to={"/login"}>Login</Link>
					<br/>
					<Link to={"/register"}>Register</Link>
					<br/>
					<UsersList/>
				</div>}
		</>
	);
}