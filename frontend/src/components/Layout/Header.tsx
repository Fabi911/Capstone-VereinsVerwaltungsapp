import {Link} from "react-router-dom";
import styled from "@emotion/styled";
import DrawerMenu from "../menu/DrawerMenu.tsx";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import {AppUser} from "../../types/AppUser.ts";

type HeaderProps = {
	logout: () => void;
	appUser: AppUser | null;
};
export default function Header({logout, appUser}: HeaderProps) {

	return (
		<StyledHeader>
			<DrawerMenu/>
			<h1>CommunityCore</h1>
			{appUser?.role &&
				<StyledLink to={"/"} onClick={logout}><LogoutIcon fontSize="large"/><br/>Ausloggen<br/>Eingeloggt
					als: {appUser.username}</StyledLink>
			}
			{!appUser?.role && <StyledLink to={"/"}><LoginIcon fontSize="large"/><br/> Login</StyledLink>}
		</StyledHeader>
	);
}
// Styles
const StyledHeader = styled.header`
    background-color: #959494;
    color: white;
    padding: 0;
    text-align: center;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    box-shadow: 1rem 2rem 1rem rgba(0, 0, 0, 0.2);
    margin: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;
const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    padding: 0.6rem;
    cursor: pointer;
    border-radius: 0.5rem;

    &:hover {
        background-color: #222;
    }
`;