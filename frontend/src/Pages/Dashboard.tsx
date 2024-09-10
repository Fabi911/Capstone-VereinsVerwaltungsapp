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
					<Link to="/members">Mitglieder - Übersicht</Link>
					<br/>
					<UsersList/>
				</div>}
		</>
	);
}