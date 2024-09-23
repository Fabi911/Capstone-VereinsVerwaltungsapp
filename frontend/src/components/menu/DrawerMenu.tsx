import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import {useState} from "react";
import {Link} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import styled from "@emotion/styled";
import {AppUser} from "../../types/AppUser.ts";

type DrawerMenuProps = {
	appUser: AppUser | null;
}
export default function DrawerMenu({appUser}: DrawerMenuProps) {
	const [open, setOpen] = useState(false);
	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};
	const DrawerList = (
		<Box sx={{width: 250, padding: 3}} role="presentation" onClick={toggleDrawer(false)}>
			<ListStyled>
				<li><LinkStyled to={"/"}><HomeIcon fontSize="large"/> Home</LinkStyled></li>
				{appUser?.role === "ADMIN" || appUser?.role === "GROUP1" ? (
					<>
						<li><LinkStyled to={"/members"}><PeopleIcon fontSize="large"/> Mitgliederübersicht</LinkStyled>
						</li>
						<li><LinkStyled to={"/cash-journal"}><AccountBalanceIcon
							fontSize="large"/> Vereinskasse</LinkStyled></li>
					</>
				) : null}
			</ListStyled>
		</Box>
	);
	return (
		<div>
			<ButtonStyled onClick={toggleDrawer(true)}><MenuOpenIcon fontSize="large"/><br/>Menü</ButtonStyled>
			<Drawer open={open} onClose={toggleDrawer(false)} sx={{
				'& .MuiDrawer-paper': {
					backgroundColor: 'var(--background-color)'
				}
			}}>
				{DrawerList}
			</Drawer>
		</div>
	)
}
// Styling
const LinkStyled = styled(Link)`
    text-decoration: none;
    color: var(--text-color);
    display: flex;
    align-items: center;
    padding: 10px;

    &:hover {
        background-color: var(--hover-color);
    }
`;
const ListStyled = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;
const ButtonStyled = styled.button`
    background-color: transparent;
    border: none;
    color: white;
    font-size: 1.8rem;
    padding: 0.6rem;
    cursor: pointer;
    border-radius: 0.5rem;

    &:hover {
        background-color: var(--hover-color);
        color: var(--text-color);
    }
`;