import {Link} from "react-router-dom";
import styled from "@emotion/styled";
import DrawerMenu from "../menu/DrawerMenu.tsx";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import {AppUser} from "../../types/AppUser.ts";
import ThemeToggle from "./ThemeToggle.tsx";

type HeaderProps = {
	logout: () => void;
	appUser: AppUser | null;
};
export default function Header({logout, appUser}: HeaderProps) {
	console.log(appUser);
	return (
		<>
			<StyledHeader>
				<DrawerMenu appUser={appUser}/>
				<h1>CommunityCore</h1>
				{appUser?.role &&
					<StyledLink to={"/"} onClick={logout}>Eingeloggt
						als: {appUser.username}<br/><LogoutIcon fontSize="large"/><br/>Ausloggen</StyledLink>
				}
				{!appUser?.role && <StyledLink to={"/"}><LoginIcon fontSize="large"/><br/> Login</StyledLink>}

			</StyledHeader>
			<ThemeSwich>
				<ThemeToggle/>
			</ThemeSwich>
		</>
	);
}
// Styles
const StyledHeader = styled.header`
    background-color: var(--bg-color-layout);
    color: var(--text-color-layout);
    padding: 0;
    text-align: center;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    box-shadow: 1rem 2rem 1rem rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-around;
    align-items: center;
`;
const StyledLink = styled(Link)`
    color: var(--text-color-layout);
    text-decoration: none;
    padding: 0.6rem;
    cursor: pointer;
    border-radius: 0.5rem;

    &:hover {
        background-color: var(--hover-color);
        color: var(--text-color);
    }
`;
const ThemeSwich = styled.div`
    position: fixed;
    top: 2rem;
    right: 2rem;
    z-index: 101;
`;