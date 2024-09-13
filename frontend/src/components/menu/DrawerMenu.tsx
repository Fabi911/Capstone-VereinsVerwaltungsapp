import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import {useState} from "react";
import {Link} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import styled from "@emotion/styled";

export default function DrawerMenu() {
	const [open, setOpen] = useState(false);
	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};
	const DrawerList = (
		<Box sx={{width: 250, padding:3}} role="presentation" onClick={toggleDrawer(false)}>
			<ListStyled>
				<li><LinkStyled to={"/"}><HomeIcon fontSize="large"/> Home</LinkStyled></li>
				<li><LinkStyled to={"/members"}><PeopleIcon fontSize="large"/> Mitgliederübersicht </LinkStyled></li>
				<li><LinkStyled to={"/cash-journal"}><AccountBalanceIcon fontSize="large"/> Kassenbuch </LinkStyled></li>

			</ListStyled>

		</Box>
	);
	return (
		<div>
			<ButtonStyled onClick={toggleDrawer(true)}><MenuOpenIcon fontSize="large"/><br/>Menü</ButtonStyled>
			<Drawer open={open} onClose={toggleDrawer(false)}>
				{DrawerList}
			</Drawer>
		</div>
	)
}
// Styling
const LinkStyled = styled(Link)`
    text-decoration: none;
    color: black;
    display: flex;
    align-items: center;
    padding: 10px;

    &:hover {
        background-color: #f0f0f0;
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
		background-color: #222;
	}
`;