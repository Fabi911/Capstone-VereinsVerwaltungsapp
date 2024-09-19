import {useEffect} from 'react';
import useLocalStorageState from "use-local-storage-state";
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';

const ThemeToggle = () => {
	const [theme, setTheme] = useLocalStorageState<string>('theme', {
		defaultValue: 'light',
	});;
	useEffect(() => {
		if (typeof theme === "string") {document.documentElement.setAttribute('data-theme', theme);}
	}, [theme]);
	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	};
	return (
		<button onClick={toggleTheme} style={{backgroundColor: 'transparent', border: 'none',cursor:'pointer'}} aria-label="Toggle theme">
			<SettingsBrightnessIcon sx={{ fontSize: '4rem',color: 'var(--text-color-layout) !important'}}/>
		</button>
	);
};
export default ThemeToggle;