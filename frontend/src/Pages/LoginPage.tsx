import axios from "axios";
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function LoginPage({setIsUserLoggedIn}: { setIsUserLoggedIn: (value: boolean) => void }) {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const navigate = useNavigate();

	function login() {
		axios.post("/api/users/login", {}, {
			auth: {
				username: username,
				password: password
			}
		})
			.then(() => {
				setUsername("");
				setPassword("");
				console.log("Login successful");
				setIsUserLoggedIn(true);
				navigate("/");
			})
			.catch(e => {
				setUsername("");
				console.error(e)
			});
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		login();
	}

	return (
		<form onSubmit={handleSubmit}>
			<input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
			<input type="password" placeholder="Password" value={password}
			       onChange={(e) => setPassword(e.target.value)}/>
			<button type="submit">Login</button>
		</form>
	)
}