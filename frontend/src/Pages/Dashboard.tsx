import UsersList from "../components/UsersList/UsersList.tsx";
import {AppUser} from "../App.tsx";
import ToDoBoard from "../components/todoBoard/ToDoBoard.tsx";
import styled from "@emotion/styled";

type DashboardProps = {
	appUser: AppUser | null;
}
export default function Dashboard({appUser}: DashboardProps) {
	return (
		<ContainerDashboard>
			{appUser?.role === "ADMIN" &&
				<>
					<h1>Dashboard</h1>
					<ContainerContent>
						<UsersList/>
						<ToDoBoard/>
					</ContainerContent>
				</>}
		</ContainerDashboard>
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
    gap: 20rem;
    padding: 2rem;
    width: 80%;
`;