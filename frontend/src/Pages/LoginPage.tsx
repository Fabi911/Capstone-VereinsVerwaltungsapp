
import {FormEvent, useState} from "react";


type LoginPageProps = {
	login: (username: string, password: string) => void;
}


export default function LoginPage(porps: LoginPageProps) {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");



	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		porps.login(username, password);
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