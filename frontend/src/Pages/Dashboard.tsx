import UsersList from "../components/UsersList/UsersList";
import {AppUser} from "../types/AppUser";
import ToDoBoard from "../components/todoBoard/ToDoBoard";
import styled from "@emotion/styled";
import LastThree from "../components/cashJournal/LastThree.tsx";

type DashboardProps = {
	appUser: AppUser | null;
}
export default function Dashboard({appUser}: DashboardProps) {
	return (
		<>

			<ContainerDashboard>
				<h1>Dashboard</h1>
				<ContainerContent>
					{(appUser?.role === "ADMIN" || appUser?.role === "GROUP1") &&
						<>
							<UsersList appUser={appUser}/>
							<ToDoBoard appUser={appUser}/>
							<LastThree/>
						</>}
					{(appUser?.role === "USER") &&
						<ToDoBoard appUser={appUser}/>}
				</ContainerContent>
			</ContainerDashboard>
		</>
	);
}
// Styles
const ContainerDashboard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90vw;
    position: relative;
`;
const ContainerContent = styled.div`
    display: flex;
    justify-content: center;
    gap: 5rem;
    padding: 2rem;
    width: 90%;
    flex-wrap: wrap;
`;