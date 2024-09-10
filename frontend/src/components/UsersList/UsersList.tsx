import {useEffect, useState} from "react";
import {AppUser} from "../../App.tsx";
import axios from "axios";
import styled from "@emotion/styled";

export default function UsersList() {
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
	const updateUserRole = async (userId: string, newRole: "ADMIN" | "USER") => {
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
		<Container>
			<h3>Users</h3>
			{error && <p style={{color: "red"}}>{error}</p>}
			<Table>
				<thead>
				<tr>
					<th>Username</th>
					<th>Role</th>
				</tr>
				</thead>
				<tbody>
				{users.map(user => (
					<tr key={user.id}>
						<td>{user.username}</td>
						<td>
							<select
								value={user.role}
								onChange={e => updateUserRole(user.id, e.target.value as "ADMIN" | "USER")}
							>
								<option value="ADMIN">ADMIN</option>
								<option value="USER">USER</option>
							</select>
						</td>
						<td>
							<button onClick={() => deleteUser(user.id)}>Delete</button>
						</td>
					</tr>
				))}
				</tbody>
			</Table>
		</Container>
	)
}

// Styles

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 300px;
	margin: 0 auto;
`;

const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	
	th, td {
		border: 1px solid black;
		padding: 0.5rem;
	}
`;