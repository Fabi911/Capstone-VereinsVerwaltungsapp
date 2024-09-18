import {useEffect, useState} from "react";
import {AppUser} from "../../types/AppUser";
import axios from "axios";
import styled from "@emotion/styled";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

type UsersListProps = {
	appUser: AppUser | null;
}
export default function UsersList({appUser}: UsersListProps) {
	const [users, setUsers] = useState<AppUser[]>([]);
	const [error, setError] = useState<string | null>(null);
	const fetchUsers = async () => {
		try {
			const res = await axios.get("/api/users");
			setUsers(res.data);
		} catch (e) {
			console.error(e);
			setError("Failed to fetch users.");
		}
	};
	const updateUserRole = async (userId: string, newRole: "ADMIN" | "USER" | "GROUP1" | "GROUP2") => {
		try {
			const userToUpdate = users.find(u => u.id === userId);
			if (userToUpdate) {
				await axios.put(`/api/users/${userId}`, {...userToUpdate, role: newRole});
				setUsers(prevUsers => prevUsers.map(u => u.id === userId ? {...u, role: newRole} : u));
			}
		} catch (e) {
			console.error(e);
			setError("Failed to update user role.");
		}
	};

	function deleteUser(userId: string) {
		axios.delete(`/api/users/${userId}`)
			.then(() => {
				setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
			})
			.catch(e => {
				console.error(e);
				setError("Failed to delete user.");
			});
	}

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<div className="ContentBox">
			<h2>Benutzer</h2>
			{error && <p>{error}</p>}
			<Table>
				<thead>
				<tr>
					<th>Username</th>
					<th>Role</th>
				</tr>
				</thead>
				<tbody>
				{users
					.filter(user => !(appUser?.role === "GROUP1" && user.role === "ADMIN"))
					.map(user => (
						<tr key={user.id}>
							<td>{user.username}</td>
							<td>
								{appUser?.role === "ADMIN" ? (
									<select
										value={user.role}
										onChange={e => updateUserRole(user.id, e.target.value as "ADMIN" | "USER" | "GROUP1" | "GROUP2")}
									>
										<option value="ADMIN">ADMIN</option>
										<option value="GROUP1">GROUP1</option>
										<option value="GROUP2">GROUP2</option>
										<option value="USER">USER</option>
									</select>
								) : (
									<select
										value={user.role}
										onChange={e => updateUserRole(user.id, e.target.value as "ADMIN" | "USER" | "GROUP1" | "GROUP2")}
									>
										<option value="GROUP1">GROUP1</option>
										<option value="GROUP2">GROUP2</option>
										<option value="USER">USER</option>
									</select>
								)}
							</td>
							<td>
								<button onClick={() => deleteUser(user.id)}><DeleteForeverIcon fontSize="large"/></button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	)
}
// Styles

const Table = styled.table`
    width: 100%;
    border: var(--box-border);

    th, td {
        border: var(--box-border);
        padding: 0.5rem;
    }
`;