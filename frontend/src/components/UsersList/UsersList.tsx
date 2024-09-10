import {useEffect, useState} from "react";
import {AppUser} from "../../App.tsx";
import axios from "axios";

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
	useEffect(() => {
		fetchUsers();
	}, []);
	return (
		<>
			<h1>Users</h1>
			{error && <p style={{color: "red"}}>{error}</p>}
			<table>
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
					</tr>
				))}
				</tbody>
			</table>
		</>
	)
}