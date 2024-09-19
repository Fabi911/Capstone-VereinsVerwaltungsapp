import { useEffect } from 'react';
import useLocalStorageState from "use-local-storage-state";

const ThemeToggle = () => {
	const [theme, setTheme] = useLocalStorageState<string>('light');

	useEffect(() => {
		if (typeof theme === "string") {document.documentElement.setAttribute('data-theme', theme);}
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	return (
		<button onClick={toggleTheme}>
			{theme === 'light' ? 'Dark Mode' : 'Light Mode'}
		</button>
	);
};

export default ThemeToggle;