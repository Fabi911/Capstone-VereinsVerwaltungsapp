import axios from "axios";
import {FormEvent, useState} from "react";
import styled from "@emotion/styled";

export default function RegisterPage() {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	function register() {
		axios.post("/api/users/register", {
			username: username,
			password: password
		})
			.then(() => {
				setUsername("");
				setPassword("");
			})
			.catch(e => {
				setUsername("");
				setPassword("");
				console.error(e)
			});
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		register();
	}

	return (
		<Form onSubmit={handleSubmit}>
			<input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
			<input type="password" placeholder="Password" value={password}
			       onChange={(e) => setPassword(e.target.value)}/>
			<button type="submit">Registrieren</button>
		</Form>
	)
}

// Styles

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	width: 200px;
	margin: 0 auto;
`;