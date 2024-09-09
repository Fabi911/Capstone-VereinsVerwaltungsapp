import {Link} from "react-router-dom";
import styled from "@emotion/styled";
import {AppUser} from "../../App.tsx";

export default function Header({logout, appUser}: { logout: () => void, appUser: AppUser | null | undefined }) {
	return (
		<StyledHeader>
			<StyledLink to={"/"}><h1>Vereinsverwaltung</h1></StyledLink>
			{appUser &&
				<StyledLink to={"/login"} onClick={logout}>Logout</StyledLink>}
		</StyledHeader>
	);
}
// Styles
const StyledHeader = styled.header`
    background-color: #333;
    color: white;
    padding: 1rem;
    text-align: center;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    box-shadow: 1rem 2rem 1rem rgba(0, 0, 0, 0.2);
    margin: 0;
`;
const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
`;